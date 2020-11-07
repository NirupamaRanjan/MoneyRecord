import React from "react";
import { mount,shallow } from "enzyme";

import HP from "./index";
import Serchcmpnt from "../SearchAndPagiAndAddUser/index";


describe('Test HP component ', () => {
    it('should render properly', () => {
        const component = shallow(<HP debug/>);
        expect(component).toMatchSnapshot();
    });
    it('should render search ' , () => {
        const component = shallow(<HP />);
        expect(component.find(Serchcmpnt)).toEqual({});
     });
     it('should include item  ' , () => {
        const component = shallow(
            <div>
              <span>Hello</span>
              <h4>Goodbye</h4>
              <span>Again</span>
            </div>
          );
          
          expect(component.contains([
            <span>Hello</span>,
            <h4>Goodbye</h4>,
          ])).toEqual(true);
          expect(component.find('h4').text()).toEqual('Goodbye');
          expect(component.find('span').at(0).text()).toEqual('Hello');
     });
     it('page-item class should call',() => {
        const component = shallow(<Serchcmpnt />);
        expect(component.exists('Button')).toEqual(true);
        expect(component.find('Button')).toHaveLength(2);
     });
     it('calls componentDidMount', () => {
        jest.spyOn(HP.prototype, 'componentDidMount');
        expect(HP.prototype.componentDidMount.mock.calls.length).toBe(0);
      });    
});
