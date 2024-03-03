import { PureComponent, ReactNode } from "react";
import { Sidebar } from "primereact/sidebar";
import Dialog from "./dialog";

export interface CustomerInfoDialogProps {
  onClose?: () => unknown;
  onSubmit?: () => unknown;
}
interface State {
  isOpen: boolean;
  customerId?: number;
}
export default class CustomerInfoDialog extends PureComponent<
  CustomerInfoDialogProps,
  State
> {
  constructor(props: CustomerInfoDialogProps) {
    super(props);

    this.showDialog = this.showDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  render(): ReactNode {
    const { isOpen, customerId } = this.state;
    const { onSubmit } = this.props;
    return (
      <Sidebar
        visible={isOpen}
        position="right"
        onHide={() => this.setState({ isOpen: false })}
        pt={{
          root: {
            className: "w-[clamp(280px,_50%,_380px)]",
          },
          header: { className: "border-b border-b-solid border-gray-400" },
        }}
        header={() => (
          <h5 className="text-xl font-bold text-gray-1000">ข้อมูลลูกค้า</h5>
        )}
      >
        <Dialog
          customerId={customerId}
          onSubmit={onSubmit}
          isOpen={isOpen}
          toggle={this.closeDialog}
        />
      </Sidebar>
    );
  }

  public showDialog(customerId?: number) {
    this.setState({
      isOpen: true,
      customerId,
    });
  }

  public closeDialog() {
    this.setState(
      {
        isOpen: false,
      },
      () => {
        const { onClose } = this.props;
        onClose && onClose();
      }
    );
  }
}
