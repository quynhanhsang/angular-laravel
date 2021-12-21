export class ResponseMessageDto {
    messages: ResponseMessage [];
}

export class ResponseMessage {
    messageType : MessageType;
    message : string;
}

export enum MessageType {
    Success = 0,
    Info = 1,
    Warning = 2,
    Error = 3
}
