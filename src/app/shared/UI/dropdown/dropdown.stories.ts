import type { Meta, StoryFn } from '@storybook/angular';
import { DropdownComponent } from './dropdown.component';

export default {
  title: 'UI/Dropdown',
  component: DropdownComponent,
} as Meta;

const Template: StoryFn<DropdownComponent> = (args: DropdownComponent) => ({
  props: args,
  template: `
  <dropdown [shortVariants]="shortVariants" [isCloseOnClick]="isCloseOnClick">
    <ul>
      <li><button>Типа список</button></li>
      <li><button>Типа список</button></li>
      <li><button>Типа список</button></li>
      <li><button>Типа список</button></li>
      <li><button>Типа список</button></li>
      <li><button>Типа список</button></li>
      <li><button>Типа список</button></li>
      <li><button>Типа список</button></li>
      <li><button>Типа список</button></li>
      <li><button>Типа список</button></li>
      <li><button>Типа список</button></li>
      <li><button>Типа список</button></li>
      <li><button>Типа список</button></li>
    </ul>
  </dropdown>`,
});

export const Default = Template.bind({});

Default.args = {
  shortVariants: ['button', 'button'],
  isCloseOnClick: false,
} as Partial<DropdownComponent>;
