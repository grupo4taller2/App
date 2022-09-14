import NetworkMock from "../mocks/network";
import InfoInput from "../src/controler/infoInput";
import Outward, { ROUTE } from "../src/controler/outward"


test("al crear un objeto outward, el mismo tiene configurada una ruta", () => {

    let outward = new Outward();

    expect(outward.route).toBe(ROUTE)

})

test("Si le paso una ruta particular, entonces esa es la configurada", () => {
    let outward = new Outward('ruta especial');

    expect(outward.route).toBe('ruta especial')
})

test("Al pedir get a la ruta base, me devuelve lo mismo que el fetch a esa ruta", () => {

    let devolucion = {msg: "Hello from users backend"};

    let mockedGet = (mainRoute, path) => {
        if (mainRoute === ROUTE && path === "/"){
            return {msg: "Hello from users backend"}
        }

        return null;
    }

    let mockedConnection = new NetworkMock({
        callGet: mockedGet
    });

    let outward = new Outward();

    outward.setNetwork(mockedConnection)
    
    expect(outward.get()).toEqual(devolucion)

})

test("Al enviar un paquete con get para un usuario, este se envia bien", () => {
    let credentials = {
        username: 'usuario',
        password: 'contrasenia'
    }

    let mockedNotify = () => null;

    let usuario = new InfoInput();
    usuario.setNotifyCallback(mockedNotify)
    usuario.handleTextChange("usuario");
    let contrasenia = new InfoInput();
    contrasenia.setNotifyCallback(mockedNotify);
    contrasenia.handleTextChange("contrasenia");

    let mockedLogIn = (mainRoute, somePath, credenciales) => {
        return credenciales;
    }

    let mockedConnection = new NetworkMock({
        callLogIn: mockedLogIn,
    })

    let outward = new Outward();

    outward.setNetwork(mockedConnection);

    expect(outward.tryLogin(usuario, contrasenia)).toEqual(credentials);
})