import type { RouteLocationRaw } from "vue-router";

interface BreadcrumbItem {
    text: string
    to?: RouteLocationRaw
}


declare module "vue-router" {
    interface RouteMeta {
        pageTitle?: string;
        breadcrumb?: BreadcrumbItem[];
    }
}
