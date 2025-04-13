"use client"

import ClipLoader from "react-spinners/ClipLoader"

type SpinnerProps = React.ComponentProps<typeof ClipLoader>

const Spinner = ({ ...props }: SpinnerProps) => {
  return <ClipLoader color="white" className="text-white" {...props} />
}

export { Spinner }
