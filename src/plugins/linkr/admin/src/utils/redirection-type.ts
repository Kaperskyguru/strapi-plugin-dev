import { RedirectionTypeEnum } from "../types/link";

const redirectionTypeOptions: RedirectionTypeEnum[] = [
  RedirectionTypeEnum.found_302,
  RedirectionTypeEnum.moved_permanently_301,
  RedirectionTypeEnum.temporary_redirect_307,
];

export { redirectionTypeOptions };
