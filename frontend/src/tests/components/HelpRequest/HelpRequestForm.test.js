import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import HelpRequestForm from "main/components/HelpRequest/HelpRequestForm";
import { helpRequestFixtures } from "fixtures/helpRequestFixtures";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";


const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("HelpRequestForm tests", () => {
    const queryClient = new QueryClient();
    const testId = "HelpRequestForm";

    test("renders correctly", async () => {

        render(
            <Router  >
                <HelpRequestForm />
            </Router>
        );
        await screen.findByText(/Requester Email/);
        await screen.findByText(/Id/);
        await screen.findByText(/Create/);
    });

    test("renders correctly when passing in a HelpRequest", async () => {

        render(
            <Router  >
                <HelpRequestForm initialContents={helpRequestFixtures.oneRequest} />
            </Router>
        );
        await screen.findByTestId(/HelpRequestForm-id/);

        await screen.findByTestId(/HelpRequestForm-requesterEmail/);
        expect(screen.getByText(/Requester Email/)).toBeInTheDocument();
        expect(screen.getByTestId(/HelpRequestForm-requesterEmail/)).toHaveValue("bradencastillo@ucsb.edu");
    });


    test("Correct Error messsages on bad input: requestTime", async () => {

        render(
            <Router  >
                <HelpRequestForm />
            </Router>
        );
        await screen.findByTestId("HelpRequestForm-requestTime");
        const requestTimeField = screen.getByTestId("HelpRequestForm-requestTime");
        const submitButton = screen.getByTestId("HelpRequestForm-submit");

        fireEvent.change(requestTimeField, { target: { value: 'bad-input' } });
        fireEvent.click(submitButton);

        await screen.findByText(/Note: Request Time must be in iso format/);
    });

    test("Correct Error messsages on bad input: solved", async () => {

        render(
            <Router  >
                <HelpRequestForm />
            </Router>
        );
        await screen.findByTestId("HelpRequestForm-solved");
        const solvedField = screen.getByTestId("HelpRequestForm-solved");
        const submitButton = screen.getByTestId("HelpRequestForm-submit");

        fireEvent.change(solvedField, { target: { value: 'bad-input' } });
        fireEvent.click(submitButton);

        await screen.findByText(/Note: Solved must be true or false/);
    });

    test("Correct Error messsages on missing input", async () => {

        render(
            <Router  >
                <HelpRequestForm />
            </Router>
        );

        await screen.findByTestId("HelpRequestForm-submit");
        const submitButton = screen.getByTestId("HelpRequestForm-submit");

        fireEvent.click(submitButton);

        await screen.findByText(/Required: Requester Email/);
        expect(screen.getByText(/Required: Team Id/)).toBeInTheDocument();
        expect(screen.getByText(/Required: Table or Breakout Room/)).toBeInTheDocument();
        expect(screen.getByText(/Required: Request Time./)).toBeInTheDocument();
        expect(screen.getByText(/Required: Explanation/)).toBeInTheDocument();
        expect(screen.getByText(/Required: Solved./)).toBeInTheDocument();
    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();

        render(
            <Router  >
                <HelpRequestForm submitAction={mockSubmitAction} />
            </Router>
        );
        await screen.findByTestId("HelpRequestForm-requesterEmail");

        const requesterEmailField = screen.getByTestId("HelpRequestForm-requesterEmail");
        const teamIdField = screen.getByTestId("HelpRequestForm-teamId");
        const tableOrBreakoutRoomField = screen.getByTestId("HelpRequestForm-tableOrBreakoutRoom");
        const requestTimeField = screen.getByTestId("HelpRequestForm-requestTime");
        const explanationField = screen.getByTestId("HelpRequestForm-explanation");
        const solvedField = screen.getByTestId("HelpRequestForm-solved");
        const submitButton = screen.getByTestId("HelpRequestForm-submit");

        fireEvent.change(requesterEmailField, { target: { value: 'bradencastillo@ucsb.edu' } });
        fireEvent.change(teamIdField, { target: { value: '5pm-2' } });
        fireEvent.change(tableOrBreakoutRoomField, { target: { value: 'Table 4' } });
        fireEvent.change(requestTimeField, { target: { value: '2022-11-07T00:00:00' } });
        fireEvent.change(explanationField, { target: { value: 'Need help with debugging' } });
        fireEvent.change(solvedField, { target: { value: 'true' } });
        fireEvent.click(submitButton);

        expect(screen.queryByText(/Note: Request Time must be in iso format/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Note: Solved must be true or false/)).not.toBeInTheDocument();
    });


    test("that navigate(-1) is called when Cancel is clicked", async () => {

        render(
            <Router  >
                <HelpRequestForm />
            </Router>
        );
        await screen.findByTestId("HelpRequestForm-cancel");
        const cancelButton = screen.getByTestId("HelpRequestForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
    });

    test("kill mutation for solved: ftrue", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <HelpRequestForm />
                </Router>
            </QueryClientProvider>
        );

        expect(await screen.findByText(/Create/)).toBeInTheDocument();
        const submitButton = screen.getByText(/Create/);
        fireEvent.click(submitButton);

        await screen.findByText(/Required: Requester Email/);
        expect(screen.getByText(/Required: Team Id/)).toBeInTheDocument();
        expect(screen.getByText(/Required: Table or Breakout Room/)).toBeInTheDocument();
        expect(screen.getByText(/Required: Request Time./)).toBeInTheDocument();
        expect(screen.getByText(/Required: Explanation/)).toBeInTheDocument();
        expect(screen.getByText(/Required: Solved./)).toBeInTheDocument();

        const solvedInput = screen.getByTestId(`${testId}-solved`);
        fireEvent.change(solvedInput, { target: { value: "ftrue" } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Note: Solved must be true or false/)).toBeInTheDocument();
        });
    });

    test("kill mutation for solved: truef", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <HelpRequestForm />
                </Router>
            </QueryClientProvider>
        );

        expect(await screen.findByText(/Create/)).toBeInTheDocument();
        const submitButton = screen.getByText(/Create/);
        fireEvent.click(submitButton);

        await screen.findByText(/Required: Requester Email/);
        expect(screen.getByText(/Required: Team Id/)).toBeInTheDocument();
        expect(screen.getByText(/Required: Table or Breakout Room/)).toBeInTheDocument();
        expect(screen.getByText(/Required: Request Time./)).toBeInTheDocument();
        expect(screen.getByText(/Required: Explanation/)).toBeInTheDocument();
        expect(screen.getByText(/Required: Solved./)).toBeInTheDocument();

        const solvedInput = screen.getByTestId(`${testId}-solved`);
        fireEvent.change(solvedInput, { target: { value: "truef" } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Note: Solved must be true or false/)).toBeInTheDocument();
        });
    });
});