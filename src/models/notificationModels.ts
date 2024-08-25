import type { NotificationListRequestDto } from "@/services/dtos/requestDtos";
import type {
    NotificationListResponseDto,
    NotificationResponseDto } from "@/services/dtos/responseDtos";
import { NotificationType } from "@/services/dtos/enums";
import { UserBasicModel } from "@/models/userModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class NotificationModel {
    public id: number;
    public type: NotificationType;
    public dateTime: string;
    public deltaText: string;
    public resourceIds: number[];
    public createdUser: UserBasicModel | null;
    public isRead: boolean;

    constructor(responseDto: NotificationResponseDto) {
        const dateTimeUltility = useDateTimeUtility();

        this.id = responseDto.id;
        this.type = responseDto.type;
        this.dateTime = dateTimeUltility
            .getDisplayDateTimeString(responseDto.dateTime);
        this.deltaText = responseDto.deltaText;
        this.resourceIds = responseDto.resourceIds ?? [];
        this.createdUser = responseDto.createdUser &&
            new UserBasicModel(responseDto.createdUser);
        this.isRead = responseDto.isRead;
    }

    public get content(): string {
        const createdUserName = `<b>${this.createdUser?.userName}</b>`;
        const pairs = {
            [NotificationType.UserCreation]: () => `${createdUserName} đã tạo tài khoản mới`,
            [NotificationType.UserModification]: () => `${createdUserName} đã chỉnh sửa một tài khoản`,
            [NotificationType.UserDeletion]: () => `${createdUserName} đã xoá một tài khoản.`,
            [NotificationType.UserBirthday]: () => "Nhân viên có sinh nhật vào hôm nay.",
            [NotificationType.UserJoiningDateAnniversary]: () => "Kỷ niệm ngày gia nhập của nhân viên.",
        
            [NotificationType.CustomerCreation]: () => `${createdUserName} đã tạo một khách hàng mới.`,
            [NotificationType.CustomerModification]: () => `${createdUserName} đã chỉnh sửa một khách hàng.`,
            [NotificationType.CustomerDeletion]: () => `${createdUserName} đã xoá một khách hàng.`,
            [NotificationType.CustomerBirthday]: () => "Khách hàng có sinh nhật vào hôm nay.",
        
            [NotificationType.ProductCreation]: () => `${createdUserName} đã tạo một sản phẩm mới`,
            [NotificationType.ProductModification]: () => `${createdUserName} đã chỉnh sửa một sản phẩm.`,
            [NotificationType.ProductDeletion]: () => `${createdUserName} đã xoá một sản phẩm.`,
        
            [NotificationType.ExpenseCreation]: () => `${createdUserName} đã tạo một chi phí mới`,
            [NotificationType.ExpenseModification]: () => `${createdUserName} đã chỉnh sửa một chi phí.`,
            [NotificationType.ExpenseDeletion]: () => `${createdUserName} đã xoá một chi phí.`,
        
            [NotificationType.SupplyCreation]: () => `${createdUserName} đã tạo một đơn nhập hàng.`,
            [NotificationType.SupplyModification]: () => `${createdUserName} đã chỉnh sửa một đơn nhập hàng.`,
            [NotificationType.SupplyDeletion]: () => `${createdUserName} đã xoá một đơn nhập hàng.`,
        
            [NotificationType.ConsultantCreation]: () => `${createdUserName} đã tạo một tư vấn mới.`,
            [NotificationType.ConsultantModification]: () => `${createdUserName} đã chỉnh sửa một tư vấn.`,
            [NotificationType.ConsultantDeletion]: () => `${createdUserName} đã xoá một tư vấn.`,
        
            [NotificationType.OrderCreation]: () => `${createdUserName} đã tạo một đơn bán lẻ mới.`,
            [NotificationType.OrderModification]: () => `${createdUserName} đã chỉnh sửa một đơn bán lẻ.`,
            [NotificationType.OrderDeletion]: () => `${createdUserName} đã xoá một đơn bán lẻ.`,
        
            [NotificationType.TreatmentCreation]: () => `${createdUserName} đã tạo một liệu trình mới.`,
            [NotificationType.TreatmentModification]: () => `${createdUserName} đã chỉnh sửa một liệu trình.`,
            [NotificationType.TreatmentDeletion]: () => `${createdUserName} đã xoá một liệu trình.`,
        
            [NotificationType.DebtIncurrenceCreation]: () => `${createdUserName} đã ghi nhận một khoản nợ.`,
            [NotificationType.DebtIncurrenceModification]: () => `${createdUserName} đã chỉnh sửa một khoản nợ.`,
            [NotificationType.DebtIncurrenceDeletion]: () => `${createdUserName} đã xoá một khoản nợ.`,
        
            [NotificationType.DebtPaymentCreation]: () => `${createdUserName} đã tạo một khoản thanh toán nợ.`,
            [NotificationType.DebtPaymentModification]: () => `${createdUserName} đã chỉnh sửa một khoản thanh toán nợ.`,
            [NotificationType.DebtPaymentDeletion]: () => `${createdUserName} đã xoá một khoản thanh toán nợ.`
        };

        return pairs[this.type]();
    }
}

export class NotificationListModel {
    public page: number = 1;
    public resultsPerPage = 10;
    public pageCount: number = 0;
    public items: NotificationModel[] = [];

    constructor(responseDto: NotificationListResponseDto) {
        this.mapFromResponseDto(responseDto);
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