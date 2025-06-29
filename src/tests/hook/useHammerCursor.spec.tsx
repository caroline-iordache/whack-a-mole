import {render} from '@testing-library/react';
import {describe, it, expect, beforeAll} from 'vitest';
import { useHammerCursor } from '../../hooks/useHammerCursor';

function HookWrapper() {
    useHammerCursor();
    return <></>;
}

describe('useHammerCursor', () => {
    beforeAll(() => {
        render(<HookWrapper />);
    })

    it('should add hammer-clicked-cursor class on mousedown event', () => {
        dispatchEvent(new MouseEvent('mousedown'));
        expect(document.body.classList.contains('hammer-clicked-cursor')).toBe(true);
    });

    it('should remove hammer-clicked-cursor class on mousedown event', () => {
        dispatchEvent(new MouseEvent('mouseup'));
        expect(document.body.classList.contains('hammer-clicked-cursor')).toBe(false);
    });
});