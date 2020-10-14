import { Alert, Button, Col, Divider, InputNumber, Modal, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;

export default function GovernanceVotingTab() {
  const [proposals, setProposals] = useState([]);
  const [votingModal, setVotingModal] = useState(false);
  const [methods, setMethods] = useState({});
  const [currentProposal, setCurrentProposal] = useState({});
  const [amount, setAmount] = useState(0);

  const kseedGovInstance = useSelector(state => state.kseedGovInstance);

  useEffect(() => {
    kseedGovInstance.then(async ({ methods }) => {
      setMethods(methods);
      const address = await methods.proposals(0).call();
      const proposal = await methods.getProposal(address).call();
      setProposals([...proposals, proposal]);
    })
  }, [kseedGovInstance]);

  const handleVoting = async () => {
    const result = await methods.voteForProposal(
      amount,
      currentProposal.optionIndex,
      currentProposal['1']
    ).call();

    setVotingModal(false);
  };

  const handleAmountChange = (v) => {
    setAmount(v);
  };

  return (
    <>
      <Modal
        visible={votingModal}
        title="Confirm vote"
        onOk={handleVoting}
        onCancel={() => setVotingModal(false)}
      >
        <InputNumber onChange={handleAmountChange} style={{ width: '100%' }} placeholder="$kSeed amount to vote" min={1} />
      </Modal>
      {proposals.map((proposal, index) => (
        <>
          <Title level={2}>Proposal #{index+1}: {proposal['0']}</Title>
          <Text>Voting ends on block #{proposal['5']}</Text>
          <Divider orientation='left'>Options</Divider>
          {proposal['2'].map((option, index) => (
            <Alert
              style={{ marginBottom: '10px' }}
              type="warning"
              message={option}
              description={
              <Row>
                <Col md={16} sm={24}>
                  {`${proposal['4'][index]} votes ($kSeed)`}
                </Col>
                <Col md={8} sm={24}>
                  <Button
                    style={{ background: '#7bfc5b', color: '#000' }}
                    color="#7bfc5b"
                    onClick={() => {
                      setCurrentProposal({ ...proposal, optionIndex: index });
                      setVotingModal(true);
                    }}
                  >
                    Vote
                  </Button>
                </Col>
              </Row>
              }
            />
          ))}
        </>
      ))}
    </>
  );
}
