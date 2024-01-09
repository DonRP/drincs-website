import { TFunction } from "i18next";
import { MyError } from "model/MyError";
import { EnqueueSnackbar, VariantType } from "notistack";

export const showToast = (message: string, variant: VariantType, enqueueSnackbar: EnqueueSnackbar) => {
    enqueueSnackbar(message, { variant });
};

export const showGenericError = (enqueueSnackbar: EnqueueSnackbar, t: TFunction) => {
    showToast(t("err_generic"), 'error', enqueueSnackbar)
}

export const showToastByMyError = (ex: any, enqueueSnackbar: EnqueueSnackbar, t: TFunction) => {
    if (ex instanceof MyError && ex.messagesToShow) {
        let data: object = {}
        if (ex.errorFields && ex.errorFields.length > 0) {
            data = { ...data, fieldName: t(ex.errorFields[0].toLowerCase()) }
        }
        showToast(t(ex.messagesToShow, { ...data }), 'error', enqueueSnackbar)
    }
    else {
        showToast(t("err_generic"), 'error', enqueueSnackbar)
    }
}
