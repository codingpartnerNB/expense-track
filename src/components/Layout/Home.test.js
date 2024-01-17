import { render, screen } from "@testing-library/react"
import Home from "./Home";

describe("Home Component", ()=>{
    test('Renders welcome to expense tracky as a text', ()=>{
        //Arrange
        render(<Home />);

        //Act
        //...nothing

        //Assert
        const welcomeElement = screen.getByText("wlcome to extense tracky", {exact: false});
        expect(welcomeElement).toBeInTheDocument();
    });
});