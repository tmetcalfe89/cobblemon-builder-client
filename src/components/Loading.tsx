import { FC } from "react";

interface LoadingProps {
  loading: boolean;
  render: FC;
}

export default function Loading({ loading, render: Render }: LoadingProps) {
  return !loading && <Render />;
}