/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface VazSideDrawer {
        "open": () => Promise<void>;
        "opened": boolean;
        "titleMenu": string;
    }
}
declare global {
    interface HTMLVazSideDrawerElement extends Components.VazSideDrawer, HTMLStencilElement {
    }
    var HTMLVazSideDrawerElement: {
        prototype: HTMLVazSideDrawerElement;
        new (): HTMLVazSideDrawerElement;
    };
    interface HTMLElementTagNameMap {
        "vaz-side-drawer": HTMLVazSideDrawerElement;
    }
}
declare namespace LocalJSX {
    interface VazSideDrawer {
        "opened"?: boolean;
        "titleMenu"?: string;
    }
    interface IntrinsicElements {
        "vaz-side-drawer": VazSideDrawer;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "vaz-side-drawer": LocalJSX.VazSideDrawer & JSXBase.HTMLAttributes<HTMLVazSideDrawerElement>;
        }
    }
}
