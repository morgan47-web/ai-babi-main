import BeatLoader from "react-spinners/BeatLoader"

type LoaderProps = React.ComponentProps<typeof BeatLoader>

const Loader = ({ ...props }: LoaderProps) => {
  return <BeatLoader color="white" className="text-white" {...props} />
}

export { Loader }
