import { uuid } from "../utils/uuid.js"

export const addProduct = (obj) => {
    const product = {...obj, id: uuid()}
    dispatch("addProduct", product)

}

export const removeProduct = (id) => {
    dispatch("removeProduct", id)
    // TODO: тут и везде сделать апдейт UI
    // В том числе и графика
}

export const modifyGoal = (calorie) => {
    dispatch("modifyGoal", calorie)

}