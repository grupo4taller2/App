import createText from "../src/model/textType"

test("Cuando el texto no esta escondido el icono es eye", () => {
    let texto = createText(true);

    texto.hide();

    expect(texto.getIcon()).toBe("eye")
})

test("Al esconder un texto escondible, el icono pasa a ser eye-off", () => {
    let texto = createText(true);

    expect(texto.getIcon()).toBe("eye-off");
})

test("Si un texto no se puede esconder, entonces no tiene icono", () => {
    let texto = createText();

    expect(texto.getIcon()).toBe(null);
})

test("Si un texto no es escondible, al esconderlo sigue sin estar escondido", () => {
    let texto = createText();

    texto.hide();

    expect(texto.ishidden()).toBe(false);
})