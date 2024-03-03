import React from "react";
import { Dialog } from "primereact/dialog";
import Button from "@/components/common/button";
import Textarea from "@/components/common/textarea";

export interface BanDialogProps {}
interface State {
  isOpen: boolean;
  customer_code: string | null;
  reason: string;
  onSubmit?: (reason: string) => any;
}
export default class BanDialog extends React.Component<BanDialogProps, State> {
  constructor(props: BanDialogProps) {
    super(props);

    this.showDialog = this.showDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);

    this.state = {
      isOpen: false,
      customer_code: null,
      reason: "",
    };
  }

  render(): React.ReactNode {
    const { customer_code, isOpen, reason } = this.state;
    return (
      <Dialog
        header={`ยืนยันการระงับลูกค้า ${customer_code}`}
        visible={isOpen}
        onHide={this.closeDialog}
        footer={this.renderActions()}
        pt={{
          footer: {
            className: "border-t border-t-solid border-t-gray-300 pt-6",
          },
        }}
      >
        <Textarea
          className="w-full"
          name="banned_reason"
          placeholder="กรุณาระบุเหตุผลที่ระงับ"
          cols={30}
          rows={5}
          value={reason}
          onChange={(e) => this.setState({ reason: e.target.value })}
        />
      </Dialog>
    );
  }

  renderActions = () => {
    const onSubmit = () => {
      this.state.onSubmit && this.state.onSubmit(this.state.reason);
      this.closeDialog();
    };
    const allowedSubmit = this.state.reason.length > 0;
    return (
      <div className="w-full justify-around items-center gap-3 flex">
        <Button color="red" onClick={this.closeDialog}>
          ยกเลิก
        </Button>
        <Button disabled={!allowedSubmit} onClick={onSubmit}>
          ยืนยัน
        </Button>
      </div>
    );
  };

  public showDialog(customer_code: string, onSubmit?: (reason: string) => any) {
    this.setState({
      isOpen: true,
      customer_code,
      reason: "",
      onSubmit,
    });
  }

  public closeDialog() {
    this.setState({
      isOpen: false,
      customer_code: null,
      reason: "",
      onSubmit: undefined,
    });
  }
}
