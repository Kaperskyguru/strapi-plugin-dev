export enum RedirectionTypeEnum {
  "temporary_redirect_307" = "temporary_redirect_307",
  "found_302" = "found_302",
  "moved_permanently_301" = "moved_permanently_301",
}

export interface ParamTypes {
  id: string;
}

export enum Redirection {
  temporary_redirect_307,
  found_302,
  moved_permanently_301,
}

export interface ILink {
  link: string;
  title: string;
  target: string;
  isNoFollow?: Boolean;
  shouldEnableTracking?: Boolean;
  paramentForwarding?: Boolean;
  isSponsored?: Boolean;
  notes?: string;
  redirection?: Redirection;
  createdAt: string;
  updatedAt: string;
}

export interface ILinkResult {
  id: number;
  attributes: ILink;
}

export interface IRedirectFormValues
  extends Omit<ILink, "id" | "createdAt" | "updatedAt"> {}

export interface IProps {
  initialValues?: IRedirectFormValues;
  handleSubmit: (values?: IRedirectFormValues, submitMore?: boolean) => void;
  isNew: boolean;
  resetCount: number;
}
