import NetworkMock from "../mocks/network";
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