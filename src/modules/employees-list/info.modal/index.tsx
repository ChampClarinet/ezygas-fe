import { PureComponent } from "react";
import { Sidebar } from "primereact/sidebar";

import Dialog from "./modal";

export interface InfoModalProps {}
export interface InfoModalState {
  isOpen: boolean;
  employeeId?: number;
}
class InfoModal extends PureComponent<InfoModalProps, InfoModalState> {
  constructor(props: InfoModalProps) {
    super(props);

    this.closeDialog = this.closeDialog.bind(this);
    this.showDialog = this.showDialog.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  render() {
    const { isOpen, employeeId } = this.state;
    return (
      <Sidebar
        visible={isOpen}
        position="right"
        onHide={this.closeDialog}
        pt={{
          root: {
            className: "w-[clamp(280px,_50%,_380px)]",
          },
          header: { className: "border-b border-b-solid border-gray-400" },
        }}
        header={() => (
          <h5 className="text-xl font-bold text-gray-1000">ข้อมูลคนส่ง</h5>
        )}
      >
        <Dialog
          toggle={this.closeDialog}
          isOpen={isOpen}
          employeeId={employeeId}
        />
      </Sidebar>
    );
  }

  public showDialog(id?: number) {
    this.setState({ isOpen: true, employeeId: id });
  }

  public closeDialog() {
    this.setState({ isOpen: false, employeeId: undefined });
  }
}

export default InfoModal;
