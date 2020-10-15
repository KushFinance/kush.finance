/* global BigInt */

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
  const [accounts, setAccounts] = useState([]);
  const [contractAddress, setContractAddress] = useState();

  const kseedGovInstance = useSelector(state => state.kseedGovInstance);
  const web3 = useSelector(state => state.web3Instance);

  useEffect(() => {
    kseedGovInstance.then(async ({ methods, ...others }) => {
      setMethods(methods);

      // GET PROPOSALS
      const results = [];
      const addresses = await methods.getProposals().call();
      const currBlock = await methods.getBlockNumber().call();
      for (const address of addresses) {
        const proposal = await methods.getProposal(address).call();
        if (proposal['5'] > currBlock) {
          results.push(proposal);
        }
      }
      setProposals(results);

      // GET USER'S ACCOUNTS
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);

      setContractAddress(others._address);
    })
  }, [kseedGovInstance]);

  const checkAllowance = async (amount) => {
    const allowance = await methods.allowance(accounts[0], contractAddress).call();
    return (BigInt(allowance) / 10000000000000000000n) > amount;
  }

  const grantAllowance = async (amount) => {
    amount = BigInt(amount) * 10000000000000000000n;
    const approval = await methods.approve(contractAddress, amount).send({
      from: accounts[0]
    });
    return approval;
  }

  const handleVoting = async () => {
    const isAllowed = await checkAllowance(amount);

    if (!isAllowed) {
      try {
        await grantAllowance(amount);
      } catch (error) {
        console.error(error);
        return;
      }
    }

    const result = await methods.voteForProposal(
      amount,
      currentProposal.optionIndex,
      currentProposal['1']
    ).send({
      from: accounts[0],
      amount
    }, (error, txh) => {
      if (error) {
        console.log('error');
        console.error(error);
      } else {
        console.log(txh);
      }
      setVotingModal(false);
    })

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
      {proposals.map((proposal, proposalIndex) => (
        <div key={proposalIndex}>
          <Title level={2}>Proposal #{proposalIndex+1}: {proposal['0']}</Title>
          <Text>Voting ends on block #{proposal['5']}</Text>
          <Divider orientation='left'>Options</Divider>
          {proposal['2'].map((option, index) => (
            <Alert
              key={proposalIndex + '-' + index}
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
        </div>
      ))}
    </>
  );
}
