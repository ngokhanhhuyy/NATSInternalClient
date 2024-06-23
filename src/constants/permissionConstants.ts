export class PermissionConstants {
    // Permissions to interact with users.
    public static readonly CreateUser = "CreateUser";
    public static readonly GetOtherUserPersonalInformation = "GetOtherUserPersonalInformation";
    public static readonly GetOtherUserUserInformation = "GetOtherUserUserInformation";
    public static readonly GetOtherUserNote = "GetOtherUserNote";
    public static readonly EditSelfPersonalInformation = "EditSelfPersonalInformation";
    public static readonly EditSelfUserInformation = "EditSelfUserInformation";
    public static readonly EditOtherUserPersonalInformation = "EditOtherUserPersonalInformation";
    public static readonly EditOtherUserUserInformation = "EditOtherUserUserInformation";
    public static readonly AssignRole = "AssignRole";
    public static readonly ResetOtherUserPassword = "ResetOtherUserPassword";
    public static readonly DeleteUser = "DeleteUser";
    public static readonly RestoreUser = "RestoreUser";

    // Permissions to interact with customers.
    public static readonly GetCustomerDetail = "GetCustomerDetail";
    public static readonly CreateCustomer = "CreateCustomer";
    public static readonly EditCustomer = "EditCustomer";
    public static readonly DeleteCustomer = "DeleteCustomer";

    // Permissions to interact with brands.
    public static readonly CreateBrand = "CreateBrand";
    public static readonly EditBrand = "EditBrand";
    public static readonly DeleteBrand = "DeleteBrand";

    // Permissions to interact with products
    public static readonly CreateProduct = "CreateProduct";
    public static readonly EditProduct = "EditProduct";
    public static readonly DeleteProduct = "DeleteProduct";

    // Permissions to interact with product categories
    public static readonly CreateProductCategory = "CreateProductCategory";
    public static readonly EditProductCategory = "EditProductCategory";
    public static readonly DeleteProductCategory = "DeleteProductCategory";

    // Permissions to interact with supplies.
    public static readonly CreateSupply = "CreateSupply";
    public static readonly EditSupply = "EditSupply";
    public static readonly DeleteSupply = "DeleteSupply";

    // Permissions to interact with supply items.
    public static readonly EditSupplyItem = "EditSupplyItem";
    public static readonly DeleteSupplyItem = "DeleteSupplyItem";

    // Permissions to interact with supply photos.
    public static readonly EditSupplyPhoto = "EditSupplyPhoto";
    public static readonly DeleteSupplyPhoto = "DeleteSupplyPhoto";

    // Permissions to interact with expenses.
    public static readonly CreateExpense = "CreateExpense";
    public static readonly EditExpense = "EditExpense";
    public static readonly DeleteExpense = "DeleteExpense";
}