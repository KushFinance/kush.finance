/* global BigInt */

import { Alert, Button, Col, Divider, InputNumber, Modal, Row, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;

export default function GovernanceVotingTab() {
  const [proposals, setProposals] = useState([]);
  const [votingModal, setVotingModal] = useState(false);
  const [currentProposal, setCurrentProposal] = useState({});
  const [currentBlock, setCurrentBlock] = useState(0);
  const [amount, setAmount] = useState(1);
  const [accounts, setAccounts] = useState([]);
  const [contractAddress, setContractAddress] = useState();
  const [voting, setVoting] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);

  const kseedGovInstance = useSelector(state => state.kseedGovInstance);
  const kseedInstance = useSelector(state => state.kseedInstance);
  const web3 = useSelector(state => state.web3Instance);

  const loadData = async () => {
    const { methods } = kseedGovInstance;
    const results = [];
    const addresses = await methods.getProposals().call();
    const currBlock = await methods.getBlockNumber().call();
    setCurrentBlock(currBlock);
    for (const address of addresses) {
      const proposal = await methods.getProposal(address).call();
      const topOptionValue = proposal['4'].reduce(function(a, b) {
        return Math.max(a, b);
      });
      proposal.topOption = proposal['4'].findIndex(x => Number(x) === topOptionValue);
      results.push(proposal);
    }
    setProposals(results);
  }

  useEffect(() => {
    (async () => {
      if (kseedGovInstance.methods) {
        loadData();
      }

      if (web3.eth) {
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
      }

      if (kseedGovInstance._address) {
        setContractAddress(kseedGovInstance._address);
      }
    })();
  }, [kseedGovInstance.methods, kseedInstance, web3]);

  const checkAllowance = async (amount) => {
    const allowance = await kseedInstance.methods.allowance(accounts[0], contractAddress).call();
    return BigInt(allowance) > amount;
  }

  const grantAllowance = async (amount) => {
    const kseedApproval = await kseedInstance.methods.approve(contractAddress, amount).send({
      from: accounts[0]
    });
    return kseedApproval;
  }

  const handleVoting = async () => {
    setVoting(true);

    try {
      const isAllowed = await checkAllowance(BigInt(amount * 10 ** 18).toString());

      if (!isAllowed) {
        try {
          await grantAllowance(BigInt(amount * 10 ** 18).toString());
        } catch (error) {
          console.error(error);
          return;
        }
      }

      await kseedGovInstance.methods.voteForProposal(
        BigInt(amount * 10 ** 18).toString(),
        currentProposal.optionIndex,
        currentProposal['1']
      ).send({
        from: accounts[0],
        amount: BigInt(amount * 10 ** 18).toString()
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

  const handleWithdrawal = async () => {
    setWithdrawing(true);
    try {
      await kseedGovInstance.methods.withdrawkSeed().send({
        from: accounts[0]
      });
      window.location.reload();
    } catch (error) {
      alert('Could not withdraw your kSeed, please check transaction');
      console.error(error);
    } finally {
      setWithdrawing(false);
      loadData();
    }
  };

  const openProposals = proposals.filter(x => x['5'] > currentBlock);
  const closedProposals = proposals.filter(x => x['5'] < currentBlock);

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
        <InputNumber onChange={handleAmountChange} style={{ width: '100%' }} placeholder="kSEED amount to vote" min={1} defaultValue={1} />
      </Modal>
      
      <Alert
        type="info"
        message={`Current ETH block: #${currentBlock}`}
        style={{ marginBottom: '10px' }}
      />

      {!openProposals.length && (
        <Alert
          type="success"
          message="Have you voted for a past proposal? You can withdraw your kSEED."
          description={<Button type="primary" loading={withdrawing} onClick={handleWithdrawal}>Withdraw</Button>}
          style={{ marginBottom: '10px' }}
        />
      )}

      {openProposals.map((proposal, proposalIndex) => (
        <div key={proposalIndex}>
          <Title level={2}>{proposal['0']}</Title>
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
                    {`${Number(proposal['4'][index]* 10 ** -18).toFixed(18)} votes (kSEED)`}
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
    
      {closedProposals.length > 0 && (
        <Divider>
          <Title level={2}>History</Title>
        </Divider>
      )}

      {closedProposals.map((proposal, proposalIndex) => (
        <div key={proposalIndex}>
          <Title level={2}>{proposal['0']}</Title>
          <Text>Voting ended on block #{proposal['5']}</Text>
          <Divider orientation='left'>Options</Divider>
          {proposal['2'].map((option, index) => {
            const style = { marginBottom: '10px' };
            if (proposal.topOption === index) {
              style.color = '#7bfc5b';
            }
            return (
              <Alert
                key={proposalIndex + '-' + index}
                style={style}
                type={proposal.topOption === index ? "success" : "warning"}
                message={<>
                  {option}
                  {proposal.topOption === index && (
                    <Tag style={{ marginLeft: '10px' }} color="green">Winner</Tag>
                  )}
                </>}
                description={
                  <Row>
                    <Col md={16} sm={24}>
                      {`${Number(proposal['4'][index]* 10 ** -18).toFixed(18)} votes ($kSeed)`}
                    </Col>
                  </Row>
                }
              />
            );
          })}
        </div>
      ))}
    </>
  );
}
