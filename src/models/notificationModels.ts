import { NotificationType } from "@/services/dtos/enums";
import { UserBasicModel } from "./userModels";
import { DateTimeDisplayModel } from "./dateTimeModels";
import type { RouteLocationRaw } from "vue-router";

export class NotificationModel {
    public id: number;
    public type: NotificationType;
    public dateTime: DateTimeDisplayModel;
    public resourceIds: number[];
    public createdUser: UserBasicModel | null;
    public isRead: boolean;

    constructor(responseDto: NotificationResponseDto) {
        this.id = responseDto.id;
        this.type = responseDto.type;
        this.dateTime = new DateTimeDisplayModel(responseDto.dateTime);
        this.resourceIds = responseDto.resourceIds ?? [];
        this.createdUser = responseDto.createdUser &&
            new UserBasicModel(responseDto.createdUser);
        this.isRead = responseDto.isRead;
    }

    public get content(): string {
        const createdUserName = `<b>${this.createdUser?.userName}</b>`;
        const typeName: string = NotificationType[this.type];
        const pairs: Record<string, () => string> = {
            "UserCreation": () => `${createdUserName} đã tạo tài khoản mới`,
            "UserModification": () => `${createdUserName} đã chỉnh sửa một tài khoản`,
            "UserDeletion": () => `${createdUserName} đã xoá một tài khoản.`,
            "UserBirthday": () => "Nhân viên có sinh nhật vào hôm nay.",
            "UserJoiningDateAnniversary": () => "Kỷ niệm ngày gia nhập của nhân viên.",
        
            "CustomerCreation": () => `${createdUserName} đã tạo một khách hàng mới.`,
            "CustomerModification": () => `${createdUserName} đã chỉnh sửa một khách hàng.`,
            "CustomerDeletion": () => `${createdUserName} đã xoá một khách hàng.`,
            "CustomerBirthday": () => "Khách hàng có sinh nhật vào hôm nay.",

            "BrandCreation": () => `${createdUserName} đã tạo một thương hiệu mới`,
            "BrandModification": () => `${createdUserName} đã chỉnh sửa một thương hiệu.`,
            "BrandDeletion": () => `${createdUserName} đã xoá một thương hiệu.`,
        
            "ProductCreation": () => `${createdUserName} đã tạo một sản phẩm mới`,
            "ProductModification": () => `${createdUserName} đã chỉnh sửa một sản phẩm.`,
            "ProductDeletion": () => `${createdUserName} đã xoá một sản phẩm.`,

            "ProductCategoryCreation": () => `${createdUserName} đã tạo một phân loại sản phẩm mới`,
            "ProductCategoryModification": () => `${createdUserName} đã chỉnh sửa một phân loại sản phẩm.`,
            "ProductCategoryDeletion": () => `${createdUserName} đã xoá một phân loại sản phẩm.`,
        
            "ExpenseCreation": () => `${createdUserName} đã tạo một chi phí mới`,
            "ExpenseModification": () => `${createdUserName} đã chỉnh sửa một chi phí.`,
            "ExpenseDeletion": () => `${createdUserName} đã xoá một chi phí.`,
        
            "SupplyCreation": () => `${createdUserName} đã tạo một đơn nhập hàng mới.`,
            "SupplyModification": () => `${createdUserName} đã chỉnh sửa một đơn nhập hàng.`,
            "SupplyDeletion": () => `${createdUserName} đã xoá một đơn nhập hàng.`,
        
            "ConsultantCreation": () => `${createdUserName} đã tạo một tư vấn mới.`,
            "ConsultantModification": () => `${createdUserName} đã chỉnh sửa một tư vấn.`,
            "ConsultantDeletion": () => `${createdUserName} đã xoá một tư vấn.`,
        
            "OrderCreation": () => `${createdUserName} đã tạo một đơn bán lẻ mới.`,
            "OrderModification": () => `${createdUserName} đã chỉnh sửa một đơn bán lẻ.`,
            "OrderDeletion": () => `${createdUserName} đã xoá một đơn bán lẻ.`,
        
            "TreatmentCreation": () => `${createdUserName} đã tạo một liệu trình mới.`,
            "TreatmentModification": () => `${createdUserName} đã chỉnh sửa một liệu trình.`,
            "TreatmentDeletion": () => `${createdUserName} đã xoá một liệu trình.`,
        
            "DebtIncurrenceCreation": () => `${createdUserName} đã ghi nhận một khoản nợ mới.`,
            "DebtIncurrenceModification": () => `${createdUserName} đã chỉnh sửa một khoản nợ.`,
            "DebtIncurrenceDeletion": () => `${createdUserName} đã xoá một khoản nợ.`,
        
            "DebtPaymentCreation": () => `${createdUserName} đã tạo một khoản thanh toán nợ mới.`,
            "DebtPaymentModification": () => `${createdUserName} đã chỉnh sửa một khoản thanh toán nợ.`,
            "DebtPaymentDeletion": () => `${createdUserName} đã xoá một khoản thanh toán nợ.`,

            "AnnouncementCreation": () => `${createdUserName} đã tạo một thông báo mới.`,
            "AnnouncementModification": () => `${createdUserName} đã chỉnh sửa một thông báo.`,
            "AnnouncementDeletion": () => `${createdUserName} đã xoá một thông báo.`
        };

        return pairs[typeName]();
    }

    public get route(): RouteLocationRaw {
        const resourceIds = this.resourceIds;
        const typeName: string = NotificationType[this.type];
        const pairs: Record<string, () => RouteLocationRaw> = {
            "UserCreation": () => `/users/${resourceIds[0]}`,
            "UserModification": () => `/users/${resourceIds[0]}`,
            "UserDeletion": () => `/users/${resourceIds[0]}`,
            "UserBirthday": () => "/users",
            "UserJoiningDateAnniversary": () => "/users",
        
            "CustomerCreation": () => `/customers/${resourceIds[0]}`,
            "CustomerModification": () => `/customers/${resourceIds[0]}`,
            "CustomerDeletion": () => "/customers",
            "CustomerBirthday": () => `/customers/${resourceIds[0]}`,

            "BrandCreation": () => `/brands/${resourceIds[0]}`,
            "BrandModification": () => `/brands/${resourceIds[0]}`,
            "BrandDeletion": () => "/brands",
        
            "ProductCreation": () => `/products/${resourceIds[0]}`,
            "ProductModification": () => `/products/${resourceIds[0]}`,
            "ProductDeletion": () =>  "/products",

            "ProductCategoryCreation": () => "/products",
            "ProductCategoryModification": () => "/products",
            "ProductCategoryDeletion": () => "/products",
        
            "ExpenseCreation": () => `/expenses/${resourceIds[0]}`,
            "ExpenseModification": () => `/expenses/${resourceIds[0]}`,
            "ExpenseDeletion": () => "/expenses",
        
            "SupplyCreation": () => `/supplies/${resourceIds[0]}`,
            "SupplyModification": () => `/supplies/${resourceIds[0]}`,
            "SupplyDeletion": () => "/supplies",
        
            "ConsultantCreation": () => `/consultants/${resourceIds[0]}`,
            "ConsultantModification": () => `/consultants/${resourceIds[0]}`,
            "ConsultantDeletion": () => "/consultants",
        
            "OrderCreation": () => `/orders/${resourceIds[0]}`,
            "OrderModification": () => `/orders/${resourceIds[0]}`,
            "OrderDeletion": () => "/orders",
        
            "TreatmentCreation": () => `/treatments/${resourceIds[0]}`,
            "TreatmentModification": () => `/treatments/${resourceIds[0]}`,
            "TreatmentDeletion": () => "/treatments",
        
            "DebtIncurrenceCreation": () => `/customers/${resourceIds[0]}`,
            "DebtIncurrenceModification": () => `/customers/${resourceIds[0]}`,
            "DebtIncurrenceDeletion": () => `/customers/${resourceIds[0]}`,
        
            "DebtPaymentCreation": () => `/customers/${resourceIds[0]}`,
            "DebtPaymentModification": () => `/customers/${resourceIds[0]}`,
            "DebtPaymentDeletion": () => `/customers/${resourceIds[0]}`,

            "AnnouncementCreation": () => `/users/${resourceIds[0]}`,
            "AnnouncementModification": () => `/users/${resourceIds[0]}`,
            "AnnouncementDeletion": () => "/users"
        };

        return pairs[typeName]();
    }
}

export class NotificationListModel {
    public page: number = 1;
    public resultsPerPage = 10;
    public pageCount: number = 0;
    public items: NotificationModel[] = [];

    constructor(responseDto?: NotificationListResponseDto) {
        if (responseDto) {
            this.mapFromResponseDto(responseDto);
        }
    }

    public mapFromResponseDto(responseDto: NotificationListResponseDto): void {
        this.pageCount = responseDto.pageCount;
        this.items = (responseDto.items ?? [])
            .map(i => new NotificationModel(i));
    }

    public toRequestDto(): NotificationListRequestDto {
        return {
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}