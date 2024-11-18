import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { usePageLoadProgressBarStore } from "@/stores/pageLoadProgressBar";
import { useAuthenticationStore } from "@/stores/authentication";
import { useInitialDataStore } from "@/stores/initialData";

import MainView from "@/views/layouts/MainView.vue";
import MainLayout from "@/views/layouts/MainLayout.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/LoginView.vue"),
        meta: {
            pageTitle: "Đăng nhập"
        },
    },
    {
        path: "/home",
        component: MainLayout,
        meta: {
            pageTitle: "Trang chủ",
        },
        children: [
            {
                path: "",
                name: "home",
                component: () => import("@/views/HomeView.vue"),
                meta: {
                    pageTitle: "Trang chủ",
                }
            },
            {
                path: "/users",
                name: "userList",
                component: () => import("../views/users/userList/UserListView.vue"),
                meta: {
                    pageTitle: "Nhân viên",
                    breadcrumb: [
                        { text: "Nhân viên" },
                    ]
                },
            },
            {
                path: "/users/:userId(\\d+)",
                name: "userProfile",
                component: () => import("../views/users/userProfile/UserProfileView.vue"),
                meta: {
                    pageTitle: "Hồ sơ nhân viên",
                    breadcrumb: [
                        { text: "Nhân viên", to: "/users" },
                        { text: "Hồ sơ" },
                    ]
                }
            },
            {
                path: "/users/create",
                name: "userCreate",
                component: () =>
                    import("@/views/users/userUpsert/userCreate/UserCreateView.vue"),
                meta: {
                    pageTitle: "Tạo nhận viên mới",
                    breadcrumb: [
                        { text: "Nhân viên", to: "/users" },
                        { text: "Tạo mới" },
                    ]
                }
            },
            {
                path: "/users/:userId(\\d+)/update",
                name: "userUpdate",
                component: () =>
                    import("../views/users/userUpsert/userUpdate/UserUpdateView.vue"),
                meta: {
                    pageTitle: "Chỉnh sửa nhân viên",
                    breadcrumb: [
                        { text: "Nhân viên", to: "/users" },
                        { text: "Cập nhật" },
                    ]
                },
            },
            {
                path: "/users/changePassword",
                name: "userPasswordChange",
                component: () =>
                    import("../views/users/userPasswordChange/UserPasswordChangeView.vue"),
                meta: {
                    pageTitle: "Đổi mật khẩu",
                    breadcrumb: [
                        { text: "Nhân viên", to: "/users" },
                        { text: "Đổi mật khẩu" },
                    ]
                },
            },
            {
                path: "/users/:userId(\\d+)/resetPassword",
                name: "userPasswordReset",
                component: () =>
                    import("@/views/users/userPasswordReset/UserPasswordResetView.vue"),
                meta: {
                    pageTitle: "Đặt lại mật khẩu",
                    breadcrumb: [
                        { text: "Nhân viên", to: "/users" },
                        { text: "Đặt lại mật khẩu" },
                    ]
                },
            },
            {
                path: "/customers",
                name: "customers",
                component: MainView,
                redirect: { name: "customerList" },
                meta: {
                    breadcrumb: [
                        { text: "Danh sách" },
                    ]
                },
                children: [
                    {
                        path: "list",
                        name: "customerList",
                        component: () =>
                            import("@/views/customers/CustomerList/CustomerListView.vue"),
                        meta: {
                            pageTitle: "Danh sách",
                            breadcrumb: [
                                { text: "Khách hàng" },
                            ],
                        }
                    },
                    {
                        path: ":customerId(\\d+)",
                        name: "customerDetail",
                        component: () =>
                            import("@/views/customers/CustomerDetail/CustomerDetailView.vue"),
                        meta: {
                            pageTitle: "Hồ sơ khách hàng",
                            breadcrumb: [
                                { text: "Khách hàng", to: { name: "customers" } },
                                { text: "Hồ sơ" }
                            ]
                        }
                    },
                    {
                        path: "create",
                        name: "customerCreate",
                        component: () =>
                            import("@/views/customers/CustomerUpsert/CustomerUpsertView.vue"),
                        props: { isForCreating: true },
                        meta: {
                            pageTitle: "Tạo khách hàng mới",
                            breadcrumb: [
                                { text: "Khách hàng", to: { name: "customers" } },
                                { text: "Tạo mới" }
                            ]
                        }
                    },
                    {
                        path: ":customerId(\\d+)/update",
                        name: "customerUpdate",
                        props: { isForCreating: false },
                        component: () =>
                            import("@/views/customers/CustomerUpsert/CustomerUpsertView.vue"),
                        meta: {
                            pageTitle: "Chỉnh sửa khách hàng",
                            breadcrumb: [
                                { text: "Khách hàng", to: { name: "customers" } },
                                { text: "Chỉnh sửa" }
                            ]
                        }
                    },
                    {
                        path: ":customerId(\\d+)/debtIncurrences/create",
                        name: "customerDebtIncurrenceCreate",
                        props: { isForCreating: true },
                        component: () =>
                            import("@/views/customers/CustomerDebIncurrenceUpsert" +
                                    "/CustomerDebtIncurrenceUpsertView.vue"),
                        meta: {
                            pageTitle: "Tạo khoản ghi nợ mới",
                            breadcrumb: [
                                { text: "Khách hàng", to: { name: "customers" } },
                                { text: "Tạo khoản ghi nợ mới" }
                            ]
                        }
                    }
                ]
            },
            {
                path: "/products",
                name: "products",
                component: MainView,
                redirect: { name: "productList" },
                meta: {
                    breadcrumb: [
                        { text: "Danh sách sản phẩm" },
                    ]
                },
                children: [
                    {
                        path: "list",
                        name: "productList",
                        component: () => import("@/views/products/productList" +
                            "/ProductListView.vue"),
                        meta: {
                            pageTitle: "Danh sách sản phẩm",
                            breadcrumb: [
                                { text: "Sản phẩm" },
                            ]
                        }
                    },
                    {
                        path: ":productId(\\d+)",
                        name: "productDetail",
                        component: () => import("@/views/products/productDetail" +
                            "/ProductDetailView.vue"),
                        meta: {
                            pageTitle: "Chi tiết sản phẩm",
                            breadcrumb: [
                                { text: "Sản phẩm", to: { name: "products" } },
                                { text: "Chi tiết" }
                            ]
                        }
                    },
                    {
                        path: "create",
                        name: "productCreate",
                        component: () => import("@/views/products/productUpsert" +
                            "/ProductUpsertView.vue"),
                        props: { isForCreating: true },
                        meta: {
                            pageTitle: "Tạo sản phẩm mới",
                            breadcrumb: [
                                { text: "Sản phẩm", to: { name: "products" } },
                                { text: "Tạo mới" }
                            ]
                        }
                    },
                    {
                        path: ":productId(\\d+)/update",
                        name: "productUpdate",
                        component: () => import("@/views/products/productUpsert" +
                            "/ProductUpsertView.vue"),
                        props: { isForCreating: false },
                        meta: {
                            pageTitle: "Chỉnh sửa sản phẩm",
                            breadcrumb: [
                                { text: "Sản phẩm", to: { name: "products" } },
                                { text: "Chỉnh sửa" }
                            ]
                        }
                    },
                    {
                        path: "categories/create",
                        name: "productCategoryCreate",
                        component: () => import("@/views/products/productCategoryUpsert" +
                            "/ProductCategoryUpsertView.vue"),
                        props: { isForCreating: true },
                        meta: {
                            pageTitle: "Tạo phân loại sản phẩm mới",
                            breadcrumb: [
                                { text: "Sản phẩm", to: { name: "products" } },
                                { text: "Tạo phân loại mới" }
                            ]
                        }
                    },
                    {
                        path: "categories/:productCategoryId(\\d+)/update",
                        name: "productCategoryUpdate",
                        component: () => import("@/views/products/productCategoryUpsert" +
                            "/ProductCategoryUpsertView.vue"),
                        props: { isForCreating: false },
                        meta: {
                            pageTitle: "Chỉnh sửa phân loại sản phẩm",
                            breadcrumb: [
                                { text: "Sản phẩm", to: { name: "products" } },
                                { text: "Chỉnh sửa phân loại" }
                            ]
                        }
                    },
                    {
                        path: "brands/create",
                        name: "brandCreate",
                        component: () => import("@/views/products/brandUpsert" +
                            "/BrandUpsertView.vue"),
                        props: { isForCreating: true },
                        meta: {
                            pageTitle: "Tạo thương hiệu mới",
                            breadcrumb: [
                                { text: "Sản phẩm", to: { name: "products" } },
                                { text: "Tạo thương hiệu mới" }
                            ]
                        }
                    },
                    {
                        path: "brands/:brandId(\\d+)/update",
                        name: "brandUpdate",
                        component: () => import("@/views/products/brandUpsert" +
                            "/BrandUpsertView.vue"),
                        props: { isForCreating: false },
                        meta: {
                            pageTitle: "Chỉnh sửa thương hiệu",
                            breadcrumb: [
                                { text: "Sản phẩm", to: { name: "products" } },
                                { text: "Chỉnh sửa thương hiệu" }
                            ]
                        }
                    },
                ]
            },
            {
                path: "/supplies",
                name: "supplies",
                component: MainView,
                redirect: { name: "supplyList" },
                children: [
                    {
                        path: "",
                        name: "supplyList",
                        component: () => import("@/views/supplies/supplyList" +
                            "/SupplyListView.vue"),
                        meta: {
                            pageTitle: "Danh sách nhập hàng",
                            breadcrumb: [
                                { text: "Nhập hàng" },
                            ]
                        }
                    },
                    {
                        path: ":supplyId(\\d+)/",
                        name: "supplyDetail",
                        component: () => import("@/views/supplies/supplyDetail" +
                            "/SupplyDetailView.vue"),
                        meta: {
                            pageTitle: "Chi tiết nhập hàng",
                            breadcrumb: [
                                { text: "Nhập hàng", to: { name: "supplyList" } },
                                { text: "Nhập hàng" },
                            ]
                        }
                    },
                    {
                        path: "create",
                        name: "supplyCreate",
                        component: () => import("@/views/supplies/supplyUpsert/" +
                            "SupplyUpsertView.vue"),
                        props: { isForCreating: true },
                        meta: {
                            pageTitle: "Tạo đơn nhập hàng mới",
                            breadcrumb: [
                                { text: "Nhập hàng", to: { name: "supplyList" } },
                                { text: "Nhập hàng" },
                            ]
                        }
                    },
                    {
                        path: ":supplyId(\\d+)/update",
                        name: "supplyUpdate",
                        component: () => import("@/views/supplies/supplyUpsert/" +
                            "SupplyUpsertView.vue"),
                        props: { isForCreating: false },
                        meta: {
                            pageTitle: "Chỉnh sửa đơn nhập hàng",
                            breadcrumb: [
                                { text: "Nhập hàng", to: { name: "supplyList" } },
                                { text: "Nhập hàng" },
                            ]
                        }
                    }
                ]
            },
            {
                path: "/expenses",
                name: "expenses",
                component: MainView,
                redirect: { name: "expenseList" },
                children: [
                    {
                        path: "",
                        name: "expenseList",
                        component: () => import("@/views/expenses/expenseList" +
                            "/ExpenseListView.vue"),
                        meta: {
                            pageTitle: "Danh sách chi phí",
                            breadcrumb: [
                                { text: "Chi phí" },
                            ]
                        }
                    },
                    {
                        path: ":expenseId(\\d+)",
                        name: "expenseDetail",
                        component: () => import("@/views/expenses/expenseDetail" +
                            "/ExpenseDetailView.vue"),
                        meta: {
                            pageTitle: "Chi tiết chi phí",
                            breadcrumb: [
                                { text: "Chi phí", to: { name: "expenseList" } },
                                { text: "Chi tiết" },
                            ]
                        }
                    },
                    {
                        path: "create",
                        name: "expenseCreate",
                        component: () => import("@/views/expenses/expenseUpsert" +
                            "/ExpenseUpsertView.vue"),
                        props: { isForCreating: true },
                        meta: {
                            pageTitle: "Tạo chi phí mới",
                            breadcrumb: [
                                { text: "Chi phí", to: { name: "expenseList" } },
                                { text: "Tạo mới" },
                            ]
                        }
                    },
                    {
                        path: ":expenseId(\\d+)/update",
                        name: "expenseUpdate",
                        component: () => import("@/views/expenses/expenseUpsert" +
                            "/ExpenseUpsertView.vue"),
                        props: { isForCreating: false },
                        meta: {
                            pageTitle: "Chỉnh sửa chi phí",
                            breadcrumb: [
                                { text: "Chi phí", to: { name: "expenseList" } },
                                { text: "Chỉnh sửa" },
                            ]
                        }
                    },
                ]
            },
            {
                path: "/orders",
                name: "orders",
                component: MainView,
                redirect: { name: "orderList" },
                children: [
                    {
                        path: "",
                        name: "orderList",
                        component: () => import("@/views/orders/OrderListView.vue"),
                        props: { resourceType: "Order" },
                        meta: {
                            pageTitle: "Danh sách đơn bản lẻ",
                            breadcrumb: [
                                { text: "Đơn bán lẻ" },
                            ]
                        }
                    },
                    {
                        path: ":orderId(\\d+)",
                        name: "orderDetail",
                        component: () => import("@/views/orders/OrderDetailView.vue"),
                        props: { resourceType: "Order" },
                        meta: {
                            pageTitle: "Chi tiết đơn bán lẻ",
                            breadcrumb: [
                                { text: "Đơn bán lẻ", to: { name: "orderList" } },
                                { text: "Chi tiết" },
                            ]
                        }
                    },
                    {
                        path: "create",
                        name: "orderCreate",
                        component: () => import("@/views/orders/OrderUpsertView.vue"),
                        props: { isForCreating: true },
                        meta: {
                            pageTitle: "Tạo đơn bán lẻ mới",
                            breadcrumb: [
                                { text: "Đơn bán lẻ", to: { name: "orderList" } },
                                { text: "Tạo mới" },
                            ]
                        }
                    },
                    {
                        path: ":orderId(\\d+)/update",
                        name: "orderUpdate",
                        component: () => import("@/views/orders/OrderUpsertView.vue"),
                        props: { isForCreating: false },
                        meta: {
                            pageTitle: "Chỉnh sửa đơn bán lẻ",
                            breadcrumb: [
                                { text: "Đơn bán lẻ", to: { name: "orderList" } },
                                { text: "Chỉnh sửa" },
                            ]
                        }
                    },
                ]
            },
            {
                path: "/treatments",
                name: "treatment",
                component: MainView,
                redirect: { name: "treatmentList" },
                children: [
                    {
                        path: "",
                        name: "treatmentList",
                        component: () => import("@/views/treatments/TreatmentListView.vue"),
                        props: { resourceType: "Treatment" },
                        meta: {
                            pageTitle: "Danh sách liệu trình",
                            breadcrumb: [
                                { text: "Liệu trình" },
                            ]
                        }
                    },
                    {
                        path: ":treatmentId(\\d+)",
                        name: "treatmentDetail",
                        component: () => import("@/views/treatments/TreatmentDetailView.vue"),
                        props: { resourceType: "Treatment" },
                        meta: {
                            pageTitle: "Chi tiết liệu trình",
                            breadcrumb: [
                                { text: "Liệu trình", to: { name: "treatmentList" } },
                                { text: "Chi tiết" },
                            ]
                        }
                    },
                    {
                        path: "create",
                        name: "treatmentCreate",
                        component: () => import("@/views/treatments/TreatmentUpsertView.vue"),
                        props: { isForCreating: true },
                        meta: {
                            pageTitle: "Tạo liệu trình mới",
                            breadcrumb: [
                                { text: "Liệu trình", to: { name: "treatmentList" } },
                                { text: "Tạo mới" },
                            ]
                        }
                    },
                    {
                        path: ":treatmentId(\\d+)/update",
                        name: "treatmentUpdate",
                        component: () => import("@/views/treatments/TreatmentUpsertView.vue"),
                        props: { isForCreating: false },
                        meta: {
                            pageTitle: "Chỉnh sửa liệu trình",
                            breadcrumb: [
                                { text: "Liệu trình", to: { name: "treatmentList" } },
                                { text: "Chỉnh sửa" },
                            ]
                        }
                    },
                ]
            },
            {
                path: "/consultants",
                name: "consultants",
                component: MainView,
                redirect: { name: "consultantList" },
                children: [
                    {
                        path: "",
                        name: "consultantList",
                        component: () => import("@/views/consultants/consultantList" +
                            "/ConsultantListView.vue"),
                        meta: {
                            pageTitle: "Danh sách tư vấn",
                            breadcrumb: [
                                { text: "Tư vấn" },
                            ]
                        }
                    },
                    {
                        path: ":consultantId(\\d+)",
                        name: "consultantDetail",
                        component: () => import("@/views/consultants/consultantDetail" +
                            "/ConsultantDetailView.vue"),
                        meta: {
                            pageTitle: "Chi tiết tư vấn",
                            breadcrumb: [
                                { text: "Tư vấn", to: { name: "consultantList" } },
                                { text: "Chi tiết" },
                            ]
                        }
                    },
                    {
                        path: "create",
                        name: "consultantCreate",
                        component: () => import("@/views/consultants/consultantUpsert" +
                            "/ConsultantUpsertView.vue"),
                        props: { isForCreating: true },
                        meta: {
                            pageTitle: "Tạo tư vấn mới",
                            breadcrumb: [
                                { text: "Tư vấn", to: { name: "consultantList" } },
                                { text: "Tạo mới" },
                            ]
                        }
                    },
                    {
                        path: ":consultantId(\\d+)/update",
                        name: "consultantUpdate",
                        component: () => import("@/views/consultants/consultantUpsert" +
                            "/ConsultantUpsertView.vue"),
                        props: { isForCreating: false },
                        meta: {
                            pageTitle: "Tạo tư vấn mới",
                            breadcrumb: [
                                { text: "Tư vấn", to: { name: "consultantList" } },
                                { text: "Chỉnh sửa" },
                            ]
                        }
                    },
                ]
            },
            {
                path: "/debts",
                name: "debts",
                component: MainView,
                redirect: { name: "debtList" },
                children: [
                    {
                        path: "",
                        name: "debtOverview",
                        component: () => import("@/views/debts/overview/OverviewView.vue"),
                        meta: {
                            pageTitle: "Tổng quan nợ",
                            breadcrumb: [{ text: "Tổng quan nợ" }],
                        }
                    },
                    {
                        path: "incurrences",
                        name: "debtIncurrenceList",
                        component: () =>
                            import("@/views/debts/list/DebtIncurrenceListView.vue"),
                        meta: {
                            pageTitle: "Danh sách khoản ghi nợ",
                            breadcrumb: [
                                { text: "Tổng quan nợ", to: { name: "debtOverview" } },
                                { text: "Danh sách khoản ghi nợ" },
                            ]
                        }
                    },
                    {
                        path: "incurrences/:debtIncurrenceId(\\d+)",
                        name: "debtIncurrenceDetail",
                        component: () =>
                            import("@/views/debts/detail/DebtIncurrenceDetailView.vue"),
                        meta: {
                            pageTitle: "Danh sách khoản ghi nợ",
                            breadcrumb: [
                                { text: "Tổng quan nợ", to: { name: "debtOverview" } },
                                {
                                    text: "Danh sách khoản ghi nợ",
                                    to: {
                                        name: "debtIncurrenceList"
                                    }
                                },
                                { text: "Chi tiết khoản ghi nợ" },
                            ]
                        }
                    },
                    {
                        path: "payments",
                        name: "debtPaymentList",
                        component: () => import("@/views/debts/list/DebtPaymentListView.vue"),
                        meta: {
                            pageTitle: "Danh sách khoản trả nợ",
                            breadcrumb: [
                                { text: "Tổng quan nợ", to: { name: "debtOverview" } },
                                { text: "Danh sách khoản trả nợ" },
                            ]
                        }
                    },
                    {
                        path: "payments/:debtPaymentsId(\\d+)",
                        name: "debtPaymentDetail",
                        component: () =>
                            import("@/views/debts/detail/DebtPaymentDetailView.vue"),
                        meta: {
                            pageTitle: "Chi tiết khoản trả nợ",
                            breadcrumb: [
                                { text: "Tổng quan nợ", to: { name: "debtOverview" } },
                                {
                                    text: "Danh sách khoản trả nợ",
                                    to: {
                                        name: "debtIncurrenceList"
                                    }
                                },
                                { text: "Chi tiết khoản trả nợ" },
                            ]
                        }
                    },
                ]
            }
        ],
    }
];

export const router = createRouter({
    history: createWebHistory("/"),
    routes: routes
});

router.beforeEach(async (to) => {
    // Page load progress bar.
    const pageLoadProgressBarStore = usePageLoadProgressBarStore();
    pageLoadProgressBarStore.start();

    // Auth store.
    const authStore = useAuthenticationStore();
    const initialDataStore = useInitialDataStore();

    // Redirect to home if the user accesses login page when already authenticated.
    if (to.name === "login") {
        if (await authStore.isAuthenticatedAsync()) {
            return { name: "home" };
        }
    } else {
        // Redirect to login page if the user accesses the pages requiring authorization while
        // not having been authenticated yet.
        if (!await authStore.isAuthenticatedAsync()) {
            return { name: "login" };
        }

        // Load the current user data if not loaded yet.
        if (!initialDataStore.hasData()) {
            await initialDataStore.loadDataAsync();
        }
    }

    // Page title
    const sharedTitle = "NATSInternal";
    if (to.meta.pageTitle) {
        document.title = to.meta.pageTitle + " - " + sharedTitle;
    } else {
        document.title = sharedTitle;
    }
});
