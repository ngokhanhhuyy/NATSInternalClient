import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { usePageLoadProgressBarStore } from "@/stores/pageLoadProgressBar";
import { useAuthorizationService } from "@/services/authorizationService";
import { PermissionConstants } from "@/constants/permissionConstants";
import { useAuthStore } from "@/stores/auth";
import { useCurrentUserStore } from "@/stores/currentUser";

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
        component: () => import("@/views/layouts/MainLayout.vue"),
        meta: {
            pageTitle: "Trang chủ",
        },
        children: [
            {
                path: "",
                name: "home",
                component: () => import("../views/HomeView.vue"),
                meta: {
                    pageTitle: "Trang chủ",
                }
            },
            {
                path: "/orders/creating",
                name: "orderCreating",
                component: () => import("../views/OrderUpsertingView.vue"),
                meta: {
                    breadcrumb: [
                        { text: "Đơn hàng", to: "/orders" },
                        { text: "Tạo mới", to: "/orders/creating" },
                    ]
                }
            },
            {
                path: "/users",
                name: "userList",
                component: () => import("../views/users/userList/UserListView.vue"),
                meta: {
                    pageTitle: "Nhân viên",
                    breadcrumb: [
                        { text: "Nhân viên", to: null },
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
                        { text: "Hồ sơ", to: null },
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
                        { text: "Tạo mới", to: null },
                    ],
                    permissionsChecker: (service) => service.canCreateUser()
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
                        { text: "Cập nhật", to: null },
                    ],
                    permissionsChecker: (service) => {
                        const permissions: string[] = [
                            PermissionConstants.EditSelfPersonalInformation,
                            PermissionConstants.EditSelfUserInformation,
                            PermissionConstants.EditOtherUserPersonalInformation,
                            PermissionConstants.EditOtherUserUserInformation
                        ];

                        for (const permission of permissions) {
                            if (service.hasPermission(permission)) {
                                return true;
                            }
                        }

                        return false;
                    }
                },
            },
            {
                path: "/users/:userId(\\d+)/changePassword",
                name: "userPasswordChange",
                component: () =>
                    import("../views/users/userPasswordChange/UserPasswordChangeView.vue"),
                meta: {
                    pageTitle: "Đổi mật khẩu",
                    breadcrumb: [
                        { text: "Nhân viên", to: "/users" },
                        { text: "Đổi mật khẩu", to: null },
                    ]
                },
            },
            {
                path: "/users/:userId(\\d+)/resetPassword",
                name: "userPasswordReset",
                component: () => import("../views/users/userPasswordReset/UserPasswordResetView.vue"),
                meta: {
                    pageTitle: "Đặt lại mật khẩu",
                    breadcrumb: [
                        { text: "Nhân viên", to: "/users" },
                        { text: "Đặt lại mật khẩu", to: null },
                    ],
                    permissionsChecker: (service) => service
                        .hasPermission(PermissionConstants.ResetOtherUserPassword)
                },
            },
            {
                path: "/customers",
                name: "customers",
                component: () => import("@/views/layouts/MainView.vue"),
                redirect: { name: "customerList" },
                meta: {
                    breadcrumb: [
                        { text: "Danh sách", to: null },
                    ]
                },
                children: [
                    {
                        path: "list",
                        name: "customerList",
                        component: () => import("@/views/customers/CustomerList/CustomerListView.vue"),
                        meta: {
                            pageTitle: "Danh sách",
                            breadcrumb: [
                                { text: "Khách hàng", to: null },
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
                                { text: "Hồ sơ", to: null }
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
                                { text: "Tạo mới", to: null }
                            ],
                            permissionsChecker: (service) => service
                                .hasPermission(PermissionConstants.CreateCustomer)
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
                                { text: "Chỉnh sửa", to: null }
                            ],
                            permissionsChecker: (service) => service
                                .hasPermission(PermissionConstants.EditCustomer)
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
                                { text: "Tạo khoản ghi nợ mới", to: null }
                            ]
                        }
                    }
                ]
            },
            {
                path: "/products",
                name: "products",
                component: () => import("@/views/layouts/MainView.vue"),
                redirect: { name: "productList" },
                meta: {
                    breadcrumb: [
                        { text: "Danh sách sản phẩm", to: null },
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
                                { text: "Sản phẩm", to: null },
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
                                { text: "Chi tiết", to: null }
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
                                { text: "Tạo mới", to: null }
                            ],
                            permissionsChecker: (service) => service
                                .hasPermission(PermissionConstants.CreateCustomer)
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
                                { text: "Chỉnh sửa", to: null }
                            ],
                            permissionsChecker: (service) => {
                                return service.hasPermission(PermissionConstants.EditProduct);
                            }
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
                                { text: "Tạo phân loại mới", to: null }
                            ],
                            permissionsChecker: (service) => {
                                return service
                                    .hasPermission(PermissionConstants.CreateProductCategory);
                            }
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
                                { text: "Chỉnh sửa phân loại", to: null }
                            ],
                            permissionsChecker: (service) => {
                                return service
                                    .hasPermission(PermissionConstants.EditProductCategory);
                            }
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
                                { text: "Tạo thương hiệu mới", to: null }
                            ],
                            permissionsChecker: (service) => {
                                return service.hasPermission(PermissionConstants.CreateBrand);
                            }
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
                                { text: "Chỉnh sửa thương hiệu", to: null }
                            ],
                            permissionsChecker: (service) => {
                                return service.hasPermission(PermissionConstants.EditBrand);
                            }
                        }
                    },
                ]
            },
            {
                path: "/supplies",
                name: "supplies",
                component: () => import("@/views/layouts/MainView.vue"),
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
                                { text: "Nhập hàng", to: null },
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
                                { text: "Nhập hàng", to: null },
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
                                { text: "Nhập hàng", to: null },
                            ],
                            permissionsChecker: (service) => service
                                .hasPermission(PermissionConstants.CreateSupply)
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
                                { text: "Nhập hàng", to: null },
                            ],
                            permissionsChecker: (service) => service
                                .hasPermission(PermissionConstants.EditSupply)
                        }
                    }
                ]
            },
            {
                path: "/expenses",
                name: "expenses",
                component: () => import("@/views/layouts/MainView.vue"),
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
                                { text: "Chi phí", to: null },
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
                                { text: "Chi tiết", to: null },
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
                                { text: "Tạo mới", to: null },
                            ],
                            permissionsChecker: (service) => {
                                return service.canCreateExpense();
                            }
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
                                { text: "Chỉnh sửa", to: null },
                            ],
                            permissionsChecker: (service) => {
                                return service.canEditExpense();
                            }
                        }
                    },
                ]
            },
            {
                path: "/orders",
                name: "orders",
                component: () => import("@/views/layouts/MainView.vue"),
                redirect: { name: "orderList" },
                children: [
                    {
                        path: "",
                        name: "orderList",
                        component: () => import("@/views/orders/orderList/OrderListView.vue"),
                        meta: {
                            pageTitle: "Danh sách đơn bản lẻ",
                            breadcrumb: [
                                { text: "Đơn bán lẻ", to: null },
                            ]
                        }
                    },
                    {
                        path: ":orderId(\\d+)",
                        name: "orderDetail",
                        component: () => import("@/views/orders/orderDetail" +
                            "/OrderDetailView.vue"),
                        meta: {
                            pageTitle: "Chi tiết đơn bán lẻ",
                            breadcrumb: [
                                { text: "Đơn bán lẻ", to: { name: "orderList" } },
                                { text: "Chi tiết", to: null },
                            ]
                        }
                    },
                    {
                        path: "create",
                        name: "orderCreate",
                        component: () => import("@/views/orders/orderUpsert" +
                            "/OrderUpsertView.vue"),
                        props: { isForCreating: true },
                        meta: {
                            pageTitle: "Tạo đơn bán lẻ mới",
                            breadcrumb: [
                                { text: "Đơn bán lẻ", to: { name: "orderList" } },
                                { text: "Tạo mới", to: null },
                            ],
                            permissionsChecker: (service) => {
                                return service.canCreateOrder();
                            }
                        }
                    },
                    {
                        path: ":orderId(\\d+)/update",
                        name: "orderUpdate",
                        component: () => import("@/views/orders/orderUpsert" +
                            "/OrderUpsertView.vue"),
                        props: { isForCreating: false },
                        meta: {
                            pageTitle: "Tạo đơn bán lẻ mới",
                            breadcrumb: [
                                { text: "Đơn bán lẻ", to: { name: "orderList" } },
                                { text: "Chỉnh sửa", to: null },
                            ],
                            permissionsChecker: (service) => {
                                return service.canEditOrder();
                            }
                        }
                    },
                ]
            },
            {
                path: "/consultants",
                name: "consultants",
                component: () => import("@/views/layouts/MainView.vue"),
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
                                { text: "Tư vấn", to: null },
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
                                { text: "Chi tiết", to: null },
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
                                { text: "Tạo mới", to: null },
                            ],
                            permissionsChecker: (service) => {
                                return service.canCreateConsultant();
                            }
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
                                { text: "Chỉnh sửa", to: null },
                            ],
                            permissionsChecker: (service) => {
                                return service.canEditConsultant();
                            }
                        }
                    },
                ]
            },
            {
                path: "/debts",
                name: "debts",
                component: () => import("@/views/layouts/MainView.vue"),
                redirect: { name: "debtList" },
                children: [
                    {
                        path: "",
                        name: "debtList",
                        component: () => import("@/views/debts/debtList/DebtListView.vue"),
                        meta: {
                            pageTitle: "Danh sách khoản nợ",
                            breadcrumb: [
                                { text: "Khoản nợ", to: null },
                            ]
                        }
                    },
                ]
            }
        ],

    }
];

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
});

router.beforeEach(async (to, from) => {
    // Page load progress bar.
    const pageLoadProgressBarStore = usePageLoadProgressBarStore();
    pageLoadProgressBarStore.start();

    // Auth store.
    const authStore = useAuthStore();
    const currentUserStore = useCurrentUserStore();

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
        if (!currentUserStore.user) {
            await currentUserStore.loadCurrentUserAsync();
        }
    
        // Check permissions.
        const authorizationService = useAuthorizationService();
        if (to.meta.permissionsChecker && !to.meta.permissionsChecker(authorizationService)) {
            if (to.meta.breadcrumb && to.meta.breadcrumb.length >= 2) {
                return to.meta.breadcrumb[to.meta.breadcrumb.length - 2].to;
            }
    
            if (from) {
                return from;
            }
    
            return { name: "home" };
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
