//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import { ClearingHouse } from '../../ClearingHouse.sol';

contract ClearingHouseDummy is ClearingHouse {
    // just to test upgradibility
    function getFixFee() public pure override returns (uint256) {
        return 1234567890;
    }
}
