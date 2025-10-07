export enum paymentHistoryEnum {
    COMPLETED = "completed",
    PENDING = "pending",
    FAILED = "failed"
}

export interface RegisterPaymentPayload {
    email: string;
    items: String[];
    razorpayPaymentId: string;
    razorpayOrderId: string;
    receiptId: string;
    amount: number;
    discount?: string;
    status: string;
}

