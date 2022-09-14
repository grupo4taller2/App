import Input from "../src/model/textInput";


test("Un texto nuevo esta vacio", () => {
    let texto = new Input();

    expect(texto.getText()).toBe('');
})

test("Al cambiar el texto, este se setea bien", () => {
    let texto = new Input();

    texto.setText('Hola');

    expect(texto.getText()).toBe('Hola');
})

test("El texto no tiene error al principio", () => {
    let texto = new Input();

    expect(texto.error).toBe(false)
})

test("Cuando se setea un error en el texto, el mismo tiene error", () => {
    let texto = new Input();

    texto.fail();

    expect(texto.error).toBe(true);
})

test("El texto, al setearlo como error y reiniciarlo ya no tiene mas error", () => {
    let texto = new Input();

    texto.fail();

    texto.unfail();

    expect(texto.error).toBe(false)
})

test("El texto sin error, se agrega bien a las opciones", () => {
    let texto = new Input();

    let info = {};

    texto.addInfo(info);

    expect(info).toEqual({
        value: texto.getText(),
        error: texto.error
    })
})