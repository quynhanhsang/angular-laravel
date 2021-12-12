export enum JobState {
    Pending = 0,
    Queueing = 1,
    Scheduling = 2,
    Executing = 3,
    RequestedToStop = 4,
    Stopping = 5,
    Completed = 6
}
export const JobStateDisplay = {
    0: "Đang chờ xử lý",
    1: "Đang xếp hàng",
    2: "Đang lên lịch",
    3: "Đang chạy",
    4: "Yêu cầu dừng",
    5: "Đang dừng",
    6: "Hoàn thành"
}


export enum JobResult {
    Error,
    Warning,
    Success
}

export const JobResultDisplay = {
    0: "Lỗi",
    1: "Cảnh báo",
    2: "Thành công",
}