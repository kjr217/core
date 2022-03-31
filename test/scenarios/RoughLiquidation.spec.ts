import { parseEther, parseUnits } from 'ethers/lib/utils';

import { truncate } from '@ragetrade/sdk';

import { vEthFixture } from '../fixtures/vETH';
import { activateMainnetFork } from '../helpers/mainnet-fork';

describe('Rough Liquidation', () => {
  before(async () => {
    await activateMainnetFork();
    await vEthFixture();
  });

  // works as expected
  it.skip('1=>position 2=>huge opposite position 2=>liquidate', async () => {
    const { clearingHouse, account0, account1, poolId, vPool, settlementToken, printMarketVal } = await vEthFixture();

    // price of ETH is 3000
    // deposit 1000, we can buy things worth 5000
    await clearingHouse.updateMargin(account1, truncate(settlementToken.address), parseUnits('1000', 6));
    // account1 does a short
    await clearingHouse.swapToken(account1, poolId, {
      amount: parseEther('-1'),
      sqrtPriceLimit: 0,
      isNotional: false,
      isPartialAllowed: false,
    });

    await printMarketVal();
    // account0 brings price up to 14k
    await clearingHouse.swapToken(account0, poolId, {
      amount: parseEther('1000'),
      sqrtPriceLimit: 0,
      isNotional: false,
      isPartialAllowed: false,
    });

    await printMarketVal();
    await clearingHouse.liquidateTokenPosition(account1, poolId);
    await printMarketVal(); // becomes zero
  });

  // allows to liquidate same account multiple times, while required margin of the account keeps increasing
  it('1=>huge short position 2=>huge opposite position 2=>liquidate', async () => {
    const { clearingHouse, account0, account1, poolId, vPool, settlementToken, printMarketVal } = await vEthFixture();

    // price of ETH is 3000
    // deposit 1000, we can buy things worth 5000
    await clearingHouse.updateMargin(account1, truncate(settlementToken.address), parseUnits('1000000', 6));
    // account1 does a short
    await clearingHouse.swapToken(account1, poolId, {
      amount: parseEther('-2000'),
      sqrtPriceLimit: 0,
      isNotional: false,
      isPartialAllowed: false,
    });

    await printMarketVal();
    // account0 brings price up to 14k
    await clearingHouse.swapToken(account0, poolId, {
      amount: parseEther('3000'),
      sqrtPriceLimit: 0,
      isNotional: false,
      isPartialAllowed: false,
    });

    await printMarketVal();
    await clearingHouse.liquidateTokenPosition(account1, poolId);
    await printMarketVal();
    await clearingHouse.liquidateTokenPosition(account1, poolId);
    await printMarketVal();
    await clearingHouse.liquidateTokenPosition(account1, poolId);
    await printMarketVal();
    await clearingHouse.liquidateTokenPosition(account1, poolId);
    await printMarketVal();
    await clearingHouse.liquidateTokenPosition(account1, poolId);
    await printMarketVal();
    await clearingHouse.liquidateTokenPosition(account1, poolId);
    await printMarketVal();
    await clearingHouse.liquidateTokenPosition(account1, poolId);
    await printMarketVal();
    await clearingHouse.liquidateTokenPosition(account1, poolId);
    await printMarketVal();
    await clearingHouse.liquidateTokenPosition(account1, poolId);
    await printMarketVal();
    await clearingHouse.liquidateTokenPosition(account1, poolId);
    await printMarketVal();
    await clearingHouse.liquidateTokenPosition(account1, poolId);
    await printMarketVal();
    await clearingHouse.liquidateTokenPosition(account1, poolId);
    await printMarketVal();
    await clearingHouse.liquidateTokenPosition(account1, poolId);
    await printMarketVal();
    await clearingHouse.liquidateTokenPosition(account1, poolId);
    await printMarketVal();
    await clearingHouse.liquidateTokenPosition(account1, poolId);
    await printMarketVal();
    await clearingHouse.liquidateTokenPosition(account1, poolId);
    await printMarketVal();
    await clearingHouse.liquidateTokenPosition(account1, poolId);
    await printMarketVal();
    await clearingHouse.liquidateTokenPosition(account1, poolId);
    await printMarketVal();
    await clearingHouse.liquidateTokenPosition(account1, poolId);
    await printMarketVal();
  });
});
