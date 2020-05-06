import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  Form,
  Select,
  Label,
  TextArea,
  Checkbox,
  Button,
} from 'semantic-ui-react';

import { RootState } from '../../store';
import { ShowModal, IModState } from '../../store/mod/reducers';
import { toggleModModal } from '../../store/mod/actions';

interface IProps {
  showModal: ShowModal;
  dispatchToggleModModal: typeof toggleModModal;
}

const ModModal = ({
  showModal,
  dispatchToggleModModal,
}: IProps): ReactElement => {
  return (
    <Modal open={showModal} onClose={dispatchToggleModModal} closeIcon>
      <Modal.Header>Ban menu</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Label>Username of player to ban:</Label>
            <Form.Input name="username" placeholder="username" />
          </Form.Field>
          <Form.Field>
            <Label>Type of ban:</Label>
            <br />
            <Checkbox value="user ban" label="User ban" />
            <br />
            <Checkbox value="full ip ban" label="Full IP ban" />
            <br />
            <Checkbox value="last ip ban" label="Last IP ban (Single)" />
          </Form.Field>
          <Form.Field>
            <Label>Reason</Label>
            <Select
              name="reason"
              placeholder="Please select an option"
              options={[
                {
                  key: 'select',
                  text: 'Please select an option',
                  disabled: true,
                },
                { key: 'abusive', value: 'abusive', text: 'Abusive' },
                {
                  key: 'griefing',
                  value: 'griefing',
                  text: 'Intentional throwing/griefing',
                },
                { key: 'afk', value: 'afk', text: 'Inactivity (AFK)' },
                { key: 'spam', value: 'spam', text: 'Spam' },
                { key: 'cheating', value: 'cheating', text: 'Cheating' },
                { key: 'other', value: 'other', text: 'Other' },
              ]}
            />
          </Form.Field>
          <Form.Field>
            <Label>Duration</Label>
            <Form.Input name="duration" placeholder="number" />
            <Select
              placeholder="Please select an option"
              options={[
                { key: 'none', text: 'None', disabled: true },
                { key: 'hours', value: 'hours', text: 'hours' },
                { key: 'days', value: 'days', text: 'days' },
                { key: 'months', value: 'months', text: 'months' },
                { key: 'years', value: 'years', text: 'years' },
                { key: 'permaban', value: 'permaban', text: 'permaban' },
              ]}
            />
          </Form.Field>
          <Form.Field>
            <Label>Description</Label>
            <TextArea
              name="description"
              placeholder="The user being banned will see this message. This message will also appear in the moderator logs."
            />
          </Form.Field>
          <Button>Submit</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = (state: RootState): IModState => ({
  showModal: state.mod.showModal,
});

const mapDispatchToProps = {
  dispatchToggleModModal: toggleModModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModModal as () => ReactElement);
