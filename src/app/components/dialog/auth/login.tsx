"use client";

import { useUser } from "@/app/context/user";
import { LeftDivider, RightDivider } from "@/components/icons/generated";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import React, { ReactNode, useRef } from "react";
import SignupDialog from "./sign-up";
import { usePricing } from "@/app/context/pricing";
import { fetchPricing } from "@/app/lib/server/actions/utils";
import Oauth from "./oauth";
import { cn } from "@/lib/utils";
import { StatusCodes } from "http-status-codes";
import validator from "validator";
import CredentialsInput from "./credentials-input";
import HeaderImage from "./header-image";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { Trans } from "@lingui/react/macro";

interface LoginProps {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  trigger?: React.ReactNode;
  onClose?: () => void;
}

export default function LoginDialog({
  trigger,
  onClose,
  open,
  setOpen,
}: LoginProps) {
  const user = useUser();
  const pricing = usePricing();
  const [loading, setLoading] = React.useState(false);
  const [localOpen, setLocalDialogOpen] = React.useState(false);
  const [signupDialoOpen, setSignupDialogOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<ReactNode>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const isSmallPhone = useMediaQuery("(max-height: 768px)");
  const backendURL = process.env.NEXT_PUBLIC_ZPPS_URL;
  const dialogOpen = open ? open : localOpen;
  const setDialogOpen = setOpen ? setOpen : setLocalDialogOpen;

  const handleResponse = async (res: Response) => {
    if (res.ok && user) {
      // TODO: fix by setting state
      window.location.reload();
    } else {
      if (res.status === StatusCodes.UNAUTHORIZED) {
        setErrorMessage(<Trans>Invalid email or password</Trans>);
      } else if (res.status === StatusCodes.PRECONDITION_FAILED) {
        setErrorMessage(<Trans>Please verify your email</Trans>);
      } else {
        setErrorMessage(<Trans>Unknown error</Trans>);
      }
      return;
    }
    const pricingInfo = await fetchPricing();

    pricing?.setState(pricingInfo);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailRef.current || !passwordRef.current || !user) {
      return;
    }

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (password === "" || email === "") {
      setErrorMessage(<Trans>Email and password cannot be empty</Trans>);
      return;
    }
    if (!validator.isEmail(email)) {
      setErrorMessage(<Trans>Enter valid email</Trans>);
      return;
    }

    setLoading(true);
    const res = await fetch(`${backendURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    handleResponse(res);
    setLoading(false);
  };

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open && onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            id="login"
            className={`
              h-7 rounded-full border border-trigger-border bg-trigger font-bold
            `}
          >
            <Trans>Log In</Trans>
          </Button>
        )}
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          className={`
            relative !m-0 flex h-full w-full flex-col rounded-none bg-cover
            bg-center bg-no-repeat !px-0 !pt-0

            md:!h-[70%] md:rounded-lg
          `}
          style={{
            backgroundImage: isSmallPhone
              ? `linear-gradient(rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%), url(/images/become-premium-reels.jpg)`
              : "",
          }}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <HeaderImage type={"login"} />
          <div className="flex flex-1 flex-col justify-center space-y-3">
            <DialogTitle className="text-center text-2xl">
              <Trans>Log In</Trans>
            </DialogTitle>
            <form
              className="flex w-full flex-col gap-2 px-4"
              onSubmit={handleSubmit}
            >
              <CredentialsInput emailRef={emailRef} passwordRef={passwordRef} />
              <Link
                href="#"
                className="text-xs text-muted-foreground underline"
              >
                <Trans>Forgot password?</Trans>
              </Link>
              <Label
                className={cn("w-full text-center text-secondary", {
                  hidden: loading || errorMessage === "",
                })}
              >
                {errorMessage}
              </Label>
              <Button
                id="dialog-login-button"
                type="submit"
                size="lg"
                className="w-full rounded-full"
                disabled={loading}
              >
                {loading ? (
                  <Spinner loading={loading} />
                ) : (
                  <Trans>Sign in</Trans>
                )}
              </Button>
              <div className="flex items-center justify-between">
                <LeftDivider width={104} height={2} />
                <p className="text-center text-xs">
                  <Trans>Or continue with</Trans>
                </p>
                <RightDivider width={104} height={2} />
              </div>
              <Oauth />
              <div className="border-t border-muted-foreground pt-2">
                <p className="text-center text-sm">
                  <Trans>
                    Don&apos;t have an account?{" "}
                    <span
                      className="text-secondary"
                      onClick={() => setSignupDialogOpen(true)}
                    >
                      Sign up!
                    </span>
                  </Trans>
                </p>
              </div>
            </form>
          </div>
        </DialogContent>
        <SignupDialog
          onClose={() => handleOpenChange(false)}
          open={signupDialoOpen}
          onOpenChange={setSignupDialogOpen}
        />
      </DialogPortal>
    </Dialog>
  );
}
