import { Component, PropsWithChildren, ReactNode } from "react";

export interface ExperienceErrorBoundaryProps extends PropsWithChildren {}

interface ExperienceErrorBoundaryState {
  error: Error | null;
}

export class ExperienceErrorBoundary extends Component<
  ExperienceErrorBoundaryProps,
  ExperienceErrorBoundaryState
> {
  public constructor(props: ExperienceErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  public componentDidCatch(error: Error, errorInfo: unknown) {
    console.error(error);
    this.setState({
      error: error,
    });
  }

  public render(): ReactNode {
    if (!this.state.error) {
      return this.props.children;
    }

    let errorMessage: string = "An unknown error has occurred!";

    if (this.state.error instanceof Error) {
      errorMessage = this.state.error.message;
    }

    return (
      <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center">
        <div className="flex flex-col gap-2 text-center">
          <p className="text-red-500 font-bold">
            There was an error displaying the 3D avatar of Alex! Please try
            reloading the page or updating your browser!
          </p>
          <p className="text-red-400">
            <span className="font-bold mr-2 text-red-500">Error Message:</span>
            {errorMessage}
          </p>
        </div>
      </div>
    );
  }
}

export default ExperienceErrorBoundary;
