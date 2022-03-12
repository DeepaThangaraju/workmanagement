import { unAuthunticatedError } from "../errors/index.js";

const checkPermission = (requestUser,resourceUserId) => {
 if(requestUser.userId===resourceUserId.toString()) return
 throw new unAuthunticatedError("Not an authorized person to access this work")
}

export default checkPermission