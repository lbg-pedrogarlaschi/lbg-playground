declare module "*.png" {
    const value: any;  // Or use `import * as React from 'react';` then `const value: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;` if you are using SVGs
    export default value;
  }
  
  declare module "*.jpg" {
    const value: any;
    export default value;
  }
  
  declare module "*.jpeg" {
    const value: any;
    export default value;
  }
  
  declare module "*.gif" {
    const value: any;
    export default value;
  }