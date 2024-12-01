import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./Registration";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

beforeAll(() => {
    global.alert = jest.fn();
});

describe("Registration component", () => {
    beforeEach(() => {
        mock.reset();
    });

    test("renders Registration form", () => {
        render(
            <Router>
                <Registration />
            </Router>
        );

        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Register/i })).toBeInTheDocument();
    });

    test("redirects to login page after successful registration", async () => {
        mock.onPost("http://localhost:5001/users").reply(200, { id: 1 });

        render(
            <Router>
                <Routes>
                    <Route path="/" element={<Registration />} />
                    <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: "testUser" } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password123" } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: "1234567890" } });

        fireEvent.click(screen.getByRole("button", { name: /Register/i }));

        await screen.findByText(/Login Page/i);
    });
});
