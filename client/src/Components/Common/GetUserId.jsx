function GetUserId(tokenName){
    const UserId=window.localStorage.getItem(tokenName);
    console.log("function of GetUserId is :"+UserId);
    return UserId;
};

export default GetUserId;