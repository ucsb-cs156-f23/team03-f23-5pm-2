import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import UCSBDiningCommonsMenuItemsEditPage from "main/pages/UCSBDiningCommonsMenuItems/UCSBDiningCommonsMenuItemsEditPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import mockConsole from "jest-mock-console";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        useParams: () => ({
            id: 17
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("UCSBDiningCommonsMenuItemsEditPage tests", () => {

    describe("when the backend doesn't return data", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/ucsbdiningcommonsmenuitems", { params: { id: 17 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {

            const restoreConsole = mockConsole();

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <UCSBDiningCommonsMenuItemsEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await screen.findByText("Edit UCSB Dining Commons Menu Item");
            expect(screen.queryByTestId("UCSBDiningCommonsMenuItems-name")).not.toBeInTheDocument();
            restoreConsole();
        });
    });

    describe("tests where backend is working normally", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/ucsbdiningcommonsmenuitems", { params: { id: 17 } }).reply(200, {
                id: 17,
                name: "Pasta Primadora",
                diningCommonsCode: "De La Carillo",
                station: "To mongolia"
            });
            axiosMock.onPut('/api/ucsbdiningcommonsmenuitems').reply(200, {
                id: "17",
                name: "Pasta Pesto",
                diningCommonsCode: "De La Portola",
                station: "Entree"
            });
        });

        const queryClient = new QueryClient();
    
        test("Is populated with the data provided", async () => {

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <UCSBDiningCommonsMenuItemsEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await screen.findByTestId("UCSBDiningCommonsMenuItemsForm-id");

            const idField = screen.getByTestId("UCSBDiningCommonsMenuItemsForm-id");
            const nameField = screen.getByTestId("UCSBDiningCommonsMenuItemsForm-name");
            const diningCommonsCodeField = screen.getByTestId("UCSBDiningCommonsMenuItemsForm-diningCommonsCode");
            const stationField = screen.getByTestId("UCSBDiningCommonsMenuItemsForm-station");
            const submitButton = screen.getByTestId("UCSBDiningCommonsMenuItemsForm-submit");

            expect(idField).toBeInTheDocument();
            expect(idField).toHaveValue("17");
            expect( nameField).toBeInTheDocument();
            expect(nameField).toHaveValue("Pasta Primadora");
            expect(diningCommonsCodeField).toBeInTheDocument();
            expect(diningCommonsCodeField).toHaveValue("De La Carillo");
            expect(stationField).toBeInTheDocument();
            expect(stationField).toHaveValue("To mongolia");

            expect(submitButton).toHaveTextContent("Update");

            fireEvent.change(nameField, { target: { value: 'Pasta Pesto' } });
            fireEvent.change(diningCommonsCodeField, { target: { value: 'Mac and Cheese' } });
            fireEvent.change(stationField, { target: { value: 'Entree' } });
            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled());
            expect(mockToast).toBeCalledWith("UCSBDiningCommonsMenuItems Updated - id: 17 name: Pasta Pesto");
            
            expect(mockNavigate).toBeCalledWith({ "to": "/ucsbdiningcommonsmenuitems" });

            expect(axiosMock.history.put.length).toBe(1); // times called
            expect(axiosMock.history.put[0].params).toEqual({ id: 17 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                name: 'Pasta Pesto',
                diningCommonsCode: 'Mac and Cheese',
                station: 'Entree'
            })); // posted object


        });

        test("Changes when you click Update", async () => {

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <UCSBDiningCommonsMenuItemsEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await screen.findByTestId("UCSBDiningCommonsMenuItemsForm-id");

            const idField = screen.getByTestId("UCSBDiningCommonsMenuItemsForm-id");
            const nameField = screen.getByTestId("UCSBDiningCommonsMenuItemsForm-name");
            const diningCommonsCodeField = screen.getByTestId("UCSBDiningCommonsMenuItemsForm-diningCommonsCode");
            const stationField = screen.getByTestId("UCSBDiningCommonsMenuItemsForm-station");
            const submitButton = screen.getByTestId("UCSBDiningCommonsMenuItemsForm-submit");

            expect(idField).toHaveValue("17");
            expect(nameField).toHaveValue("Pasta Primadora");
            expect(diningCommonsCodeField).toHaveValue("De La Carillo");
            expect(stationField).toHaveValue("To mongolia");
            expect(submitButton).toBeInTheDocument();

            fireEvent.change(nameField, { target: { value: 'Pasta Pesto' } })
            fireEvent.change(diningCommonsCodeField, { target: { value: 'De La Guerra' } })
            fireEvent.change(stationField, { target: { value: 'Entree' } })

            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled());
            expect(mockToast).toBeCalledWith("UCSBDiningCommonsMenuItems Updated - id: 17 name: Pasta Pesto");
            expect(mockNavigate).toBeCalledWith({ "to": "/ucsbdiningcommonsmenuitems" });
        });

       
    });
});
