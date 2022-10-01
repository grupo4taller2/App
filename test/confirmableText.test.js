import ConfirmableTextInput from "../src/controler/confirmableText"

test("Un texto confirmable tiene un campo con nombre y otro con confirm mas nombre",
() => {
    let text = new ConfirmableTextInput(true, {
        label: "Password"
    });

    expect(text.getInfo().label).toBe("Password");
    expect(text.getSecondaryInfo().label).toBe("Confirm Password");
})

test("Cuando seteo el texto principal y no es igual al segundo falla", 
() => {
    let text = new ConfirmableTextInput(true, {
        label: "Password"
    });

    const callback = (someText) => {

    };

    text.setNotifyCallback(callback);

    text.handleTextChange("Hola");

    let info = text.getInfo(); 

    expect(info.value).toBe("Hola");
    expect(info.error).toBe(true);
})

test("Cuando seteo el texto secundario y no es igual al principial hay error",
() => {
   let text = new ConfirmableTextInput(true, {
    label: "password"
   });
   
   const callBack = (someText) => {

   };

   text.setNotifyCallback(callBack);

   text.handleSecondaryTextChange("Hola");

   let info = text.getSecondaryInfo();

   expect(info.value).toBe("Hola");
   expect(info.error).toBe(true);
})

test("Cuando seteo los dos textos y son iguales, entonces ya no fallan", 
() => {
    let text = new ConfirmableTextInput(true,
        {
            label: "password"
        });

    const callBack = (someText) => {

    };

    text.setNotifyCallback(callBack);

    text.handleTextChange("Hola");
    text.handleSecondaryTextChange("Hola");

    let info = text.getInfo();
    let secondaryInfo = text.getSecondaryInfo();

    expect(info.value).toEqual(secondaryInfo.value);

    expect(info.error).toBe(false);
    expect(secondaryInfo.error).toBe(false);
})