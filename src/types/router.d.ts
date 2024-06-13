import "vue-router";
import { IAuthorizationService } from "@/services/authorizationService";

interface BreadcrumbItem {
    text: string;
    to: RouteLocationNormalized
}

declare module "vue-router" {
  interface RouteMeta {
    pageTitle?: string;
    breadcrumb?: BreadcrumbItem[];
    permissionsChecker?: (service: IAuthorizationService) => boolean;
  }
}