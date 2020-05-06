import React, { ReactElement, useState } from 'react';
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
import { toggleModModal, modBan } from '../../store/mod/actions';

interface IProps {
  showModal: ShowModal;
  dispatchToggleModModal: typeof toggleModModal;
  dispatchModBan: typeof modBan;
}

const ModModal = ({
  showModal,
  dispatchToggleModModal,
  dispatchModBan,
}: IProps): ReactElement => {
  const [inputs, setInputs] = useState({
    username: '',
    reason: '',
    duration: '',
    description: '',
  });

  type BanTypes = 'userban' | 'fullipban' | 'lastipban';
  type CheckedInputs = {
    [banType in BanTypes]: boolean;
  };

  const [checkedInputs, setCheckedInputs] = useState<CheckedInputs>({
    userban: false,
    fullipban: false,
    lastipban: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.persist();
    return setInputs(() => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handleCheckedInputsChange = (
    e: React.FormEvent<HTMLInputElement>,
  ): void => {
    e.persist();

    return setCheckedInputs((prevState) => {
      // e.target grabs the label but not the input
      // is there a better way to do this?
      const el = (e.target as HTMLLabelElement).previousSibling;
      return {
        ...checkedInputs,
        [(el as HTMLInputElement).name]: !prevState[
          (el as HTMLInputElement).name as BanTypes
        ],
      };
    });
  };

  const checkboxes = [
    {
      name: 'userban',
      key: 'userban',
      label: 'User ban',
    },
    {
      name: 'fullipban',
      key: 'fullipban',
      label: 'Full IP ban',
    },
    {
      name: 'lastipban',
      key: 'lastipban',
      label: 'Last IP ban (single)',
    },
  ];

  return (
    <Modal open={showModal} onClose={dispatchToggleModModal} closeIcon>
      <Modal.Header>Ban menu</Modal.Header>
      <Modal.Content>
        <Form
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            handleInputChange(e)
          }
          onSubmit={(e: React.FormEvent<HTMLFormElement>): void => {
            e.preventDefault();
            dispatchModBan({ ...inputs, ...checkedInputs });
          }}
        >
          <Form.Field>
            <Label>Username of player to ban:</Label>
            <Form.Input name="username" placeholder="username" />
          </Form.Field>
          <Form.Field>
            <Label>Type of ban:</Label>
            {checkboxes.map(({ key, name, label }) => (
              <div key={key}>
                <Checkbox
                  name={name}
                  label={label}
                  checked={checkedInputs[name as BanTypes]}
                  onChange={handleCheckedInputsChange}
                />
              </div>
            ))}
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
          <Button type="submit">Submit</Button>
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
  dispatchModBan: modBan,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModModal as () => ReactElement);
