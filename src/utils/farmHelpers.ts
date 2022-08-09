const ARCHIVED_FARMS_START_PID = 5000
const ARCHIVED_FARMS_END_PID = 5002

const isArchivedPid = (pid: number) => pid >= ARCHIVED_FARMS_START_PID && pid <= ARCHIVED_FARMS_END_PID

export default isArchivedPid
