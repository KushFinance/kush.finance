/* global BigInt */

import { Alert, Button, Col, Divider, InputNumber, Modal, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;

export default function GovernanceVotingTab() {
  const [proposals, setProposals] = useState([]);
  const [votingModal, setVotingModal] = useState(false);
  const [kSeedGovMethods, setkSeedGovMethods] = useState({});
  const [kSeedMethods, setkSeedMethods] = useState({});
  const [currentProposal, setCurrentProposal] = useState({});
  const [amount, setAmount] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [contractAddress, setContractAddress] = useState();
  const [voting, setVoting] = useState(false);

  const kseedGovInstance = useSelector(state => state.kseedGovInstance);
  const kseedInstance = useSelector(state => state.kseedInstance);
  const web3 = useSelector(state => state.web3Instance);

  const loadData = async (methods = kSeedGovMethods) => {
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
  }

  useEffect(() => {
    kseedGovInstance.then(async ({ methods, ...others }) => {
      setkSeedGovMethods(methods);

      loadData(methods);

      // GET USER'S ACCOUNTS
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);

      setContractAddress(others._address);
    });

    kseedInstance.then(({ methods }) => {
      setkSeedMethods(methods);
    })
  }, [kseedGovInstance, kseedInstance]);

  const checkAllowance = async (amount) => {
    const allowance = await kSeedMethods.allowance(accounts[0], contractAddress).call();
    return (BigInt(allowance) / 10000000000000000000n) > amount;
  }

  const grantAllowance = async (amount) => {
    amount = BigInt(amount * 10 ** 18);
    const kseedApproval = await kSeedMethods.approve(contractAddress, amount).send({
      from: accounts[0]
    });
    return kseedApproval;
  }

  const handleVoting = async () => {
    setVoting(true);

    try {
      const isAllowed = await checkAllowance(amount);

      if (!isAllowed) {
        try {
          await grantAllowance(amount);
        } catch (error) {
          console.error(error);
          return;
        }
      }

      await kSeedGovMethods.voteForProposal(
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
      });
    } catch (error) {
      alert('An error occured, please check transaction');
      console.error(error);
    } finally {
      setVotingModal(false);
      setVoting(false);
      loadData();
    }
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
        onCancel={() => {
          if (!voting) {
            setVotingModal(false)
          }
        }}
        okButtonProps={{
          loading: voting
        }}
        cancelButtonProps={{
          loading: voting
        }}
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
