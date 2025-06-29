import {render, fireEvent} from '@testing-library/react';
import {Button} from '../../components/Button';
import {describe, it, expect, vi} from 'vitest';

describe('Button', () => {
    it('should contain text children', async () => {
        const {baseElement} = render(<Button>Click me</Button>);
        expect(baseElement.textContent).toEqual('Click me')
    });

    it('should call onClick when clicked', async () => {
        const handleClick = vi.fn();
        const {container} = render(<Button onClick={handleClick}>Click me</Button>);
        const button = container.getElementsByTagName('button');
        fireEvent.click(button[0]);
        expect(handleClick).toHaveBeenCalledTimes(1)
    });
});