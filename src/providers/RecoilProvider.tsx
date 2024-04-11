"use client";

import { RecoilRoot, RecoilRootProps } from "recoil";

export function RecoilProvider({ children, ...props }: RecoilRootProps) {
  return <RecoilRoot {...props}>{children}</RecoilRoot>;
}
