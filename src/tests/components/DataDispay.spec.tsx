import {render} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import {DataDisplay} from "../../components/DataDispay.tsx";

describe('DataDisplay', () => {
    it('should display children', async () => {
        const {baseElement} = render(<DataDisplay iconName={'icon-cool2'} width={320}>test</DataDisplay>);
        expect(baseElement.textContent).toEqual('test')
    });

    it('should have icon className', async () => {
        const {container} = render(<DataDisplay iconName={'icon-cool2'} width={320}>test</DataDisplay>);
        const element = container.getElementsByClassName('icon-cool2')
        expect(element).toBeTruthy()
    });

    it('should have width param', async () => {
        const {container} = render(<DataDisplay iconName={'icon-cool2'} width={320}>test</DataDisplay>);
        const element = container.getElementsByClassName('data')
        expect(element[0].getAttribute('width')).toBe("320");
    });
});