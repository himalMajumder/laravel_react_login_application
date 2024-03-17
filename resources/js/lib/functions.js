import { toast } from "react-toastify";

export function pad(digit) {
    return digit < 10 ? "0" + digit.toString() : digit.toString();
}

export function discountParcentage(price, discount) {
    return price * ((100 - discount) / 100);
}

export function numberFormat(value) {
    return Number(value).toFixed(2);
}

export function numberWithSpaces(x) {
    return x.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

export function isLoggedInCheck() {
    if (
        localStorage.getItem("isLoggedIn") &&
        localStorage.getItem("isLoggedIn") === "true" &&
        localStorage.getItem("loggedToken") &&
        localStorage.getItem("loggedToken").length
    ) {
        return true;
    }
    return false;
}

export function callToast(
    type = "success",
    message = "Message",
    closeTime = 5000,
    position = "top-center"
) {
    if (window.innerHeight >= 850) {
        position = "bottom-center";
    }

    const options = {
        position: position,
        autoClose: closeTime,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    if (type === "success") {
        toast.success(message, options);
    } else if (type === "info") {
        toast.info(message, options);
    } else if (type === "error") {
        toast.error(message, options);
    } else {
        toast(message, options);
    }
}

export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export function setValueLocalStorage(value, key = "loggedToken") {
    if(value.length){
        value = window.btoa(value);
        value = "||12A$$ABD||" + value;
        value = window.btoa(value);
    }
    localStorage.setItem(key, value);
    return null;
}

export function getValueLocalStorage(key = "loggedToken") {
    var value = localStorage.getItem(key);
    value = window.atob(value);
    value = value.replace("||12A$$ABD||", "");
    value = window.atob(value);
    return value;
}
