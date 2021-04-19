/**
 *Submitted for verification at Etherscan.io on 2020-11-11
*/

// SPDX-License-Identifier: none

pragma solidity ^0.6.6;


// 
/*
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with GSN meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address payable) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes memory) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}

// 
/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

// 
/**
 * @dev Wrappers over Solidity's arithmetic operations with added overflow
 * checks.
 *
 * Arithmetic operations in Solidity wrap on overflow. This can easily result
 * in bugs, because programmers usually assume that an overflow raises an
 * error, which is the standard behavior in high level programming languages.
 * `SafeMath` restores this intuition by reverting the transaction when an
 * operation overflows.
 *
 * Using this library instead of the unchecked operations eliminates an entire
 * class of bugs, so it's recommended to use it always.
 */
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}

// 
/**
 * @dev Collection of functions related to the address type
 */
library Address {
    /**
     * @dev Returns true if `account` is a contract.
     *
     * [IMPORTANT]
     * ====
     * It is unsafe to assume that an address for which this function returns
     * false is an externally-owned account (EOA) and not a contract.
     *
     * Among others, `isContract` will return false for the following
     * types of addresses:
     *
     *  - an externally-owned account
     *  - a contract in construction
     *  - an address where a contract will be created
     *  - an address where a contract lived, but was destroyed
     * ====
     */
    function isContract(address account) internal view returns (bool) {
        // This method relies in extcodesize, which returns 0 for contracts in
        // construction, since the code is only stored at the end of the
        // constructor execution.

        uint256 size;
        // solhint-disable-next-line no-inline-assembly
        assembly { size := extcodesize(account) }
        return size > 0;
    }

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount, "Address: insufficient balance");

        // solhint-disable-next-line avoid-low-level-calls, avoid-call-value
        (bool success, ) = recipient.call{ value: amount }("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }

    /**
     * @dev Performs a Solidity function call using a low level `call`. A
     * plain`call` is an unsafe replacement for a function call: use this
     * function instead.
     *
     * If `target` reverts with a revert reason, it is bubbled up by this
     * function (like regular Solidity function calls).
     *
     * Returns the raw returned data. To convert to the expected return value,
     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
     *
     * Requirements:
     *
     * - `target` must be a contract.
     * - calling `target` with `data` must not revert.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data) internal returns (bytes memory) {
      return functionCall(target, data, "Address: low-level call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with
     * `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data, string memory errorMessage) internal returns (bytes memory) {
        return _functionCallWithValue(target, data, 0, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but also transferring `value` wei to `target`.
     *
     * Requirements:
     *
     * - the calling contract must have an ETH balance of at least `value`.
     * - the called Solidity function must be `payable`.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(address target, bytes memory data, uint256 value) internal returns (bytes memory) {
        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
    }

    /**
     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but
     * with `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(address target, bytes memory data, uint256 value, string memory errorMessage) internal returns (bytes memory) {
        require(address(this).balance >= value, "Address: insufficient balance for call");
        return _functionCallWithValue(target, data, value, errorMessage);
    }

    function _functionCallWithValue(address target, bytes memory data, uint256 weiValue, string memory errorMessage) private returns (bytes memory) {
        require(isContract(target), "Address: call to non-contract");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = target.call{ value: weiValue }(data);
        if (success) {
            return returndata;
        } else {
            // Look for revert reason and bubble it up if present
            if (returndata.length > 0) {
                // The easiest way to bubble the revert reason is using memory via assembly

                // solhint-disable-next-line no-inline-assembly
                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert(errorMessage);
            }
        }
    }
}

// 
/**
 * @title SafeERC20
 * @dev Wrappers around ERC20 operations that throw on failure (when the token
 * contract returns false). Tokens that return no value (and instead revert or
 * throw on failure) are also supported, non-reverting calls are assumed to be
 * successful.
 * To use this library you can add a `using SafeERC20 for IERC20;` statement to your contract,
 * which allows you to call the safe operations as `token.safeTransfer(...)`, etc.
 */
library SafeERC20 {
    using SafeMath for uint256;
    using Address for address;

    function safeTransfer(IERC20 token, address to, uint256 value) internal {
        _callOptionalReturn(token, abi.encodeWithSelector(token.transfer.selector, to, value));
    }

    function safeTransferFrom(IERC20 token, address from, address to, uint256 value) internal {
        _callOptionalReturn(token, abi.encodeWithSelector(token.transferFrom.selector, from, to, value));
    }

    /**
     * @dev Deprecated. This function has issues similar to the ones found in
     * {IERC20-approve}, and its usage is discouraged.
     *
     * Whenever possible, use {safeIncreaseAllowance} and
     * {safeDecreaseAllowance} instead.
     */
    function safeApprove(IERC20 token, address spender, uint256 value) internal {
        // safeApprove should only be called when setting an initial allowance,
        // or when resetting it to zero. To increase and decrease it, use
        // 'safeIncreaseAllowance' and 'safeDecreaseAllowance'
        // solhint-disable-next-line max-line-length
        require((value == 0) || (token.allowance(address(this), spender) == 0),
            "SafeERC20: approve from non-zero to non-zero allowance"
        );
        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, value));
    }

    function safeIncreaseAllowance(IERC20 token, address spender, uint256 value) internal {
        uint256 newAllowance = token.allowance(address(this), spender).add(value);
        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, newAllowance));
    }

    function safeDecreaseAllowance(IERC20 token, address spender, uint256 value) internal {
        uint256 newAllowance = token.allowance(address(this), spender).sub(value, "SafeERC20: decreased allowance below zero");
        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, newAllowance));
    }

    /**
     * @dev Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement
     * on the return value: the return value is optional (but if data is returned, it must not be false).
     * @param token The token targeted by the call.
     * @param data The call data (encoded using abi.encode or one of its variants).
     */
    function _callOptionalReturn(IERC20 token, bytes memory data) private {
        // We need to perform a low level call here, to bypass Solidity's return data size checking mechanism, since
        // we're implementing it ourselves. We use {Address.functionCall} to perform this call, which verifies that
        // the target address contains contract code and also asserts for success in the low-level call.

        bytes memory returndata = address(token).functionCall(data, "SafeERC20: low-level call failed");
        if (returndata.length > 0) { // Return data is optional
            // solhint-disable-next-line max-line-length
            require(abi.decode(returndata, (bool)), "SafeERC20: ERC20 operation did not succeed");
        }
    }
}

// 
/**
 * @dev Implementation of the {IERC20} interface.
 *
 * This implementation is agnostic to the way tokens are created. This means
 * that a supply mechanism has to be added in a derived contract using {_mint}.
 * For a generic mechanism see {ERC20PresetMinterPauser}.
 *
 * TIP: For a detailed writeup see our guide
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms].
 *
 * We have followed general OpenZeppelin guidelines: functions revert instead
 * of returning `false` on failure. This behavior is nonetheless conventional
 * and does not conflict with the expectations of ERC20 applications.
 *
 * Additionally, an {Approval} event is emitted on calls to {transferFrom}.
 * This allows applications to reconstruct the allowance for all accounts just
 * by listening to said events. Other implementations of the EIP may not emit
 * these events, as it isn't required by the specification.
 *
 * Finally, the non-standard {decreaseAllowance} and {increaseAllowance}
 * functions have been added to mitigate the well-known issues around setting
 * allowances. See {IERC20-approve}.
 */
contract ERC20 is Context, IERC20 {
    using SafeMath for uint256;

    mapping (address => uint256) private _balances;

    mapping (address => mapping (address => uint256)) private _allowances;

    uint256 private _totalSupply;

    string private _name;
    string private _symbol;
    uint8 private _decimals;

    /**
     * @dev Sets the values for {name} and {symbol}, initializes {decimals} with
     * a default value of 18.
     *
     * To select a different value for {decimals}, use {_setupDecimals}.
     *
     * All three of these values are immutable: they can only be set once during
     * construction.
     */
    constructor (string memory name, string memory symbol) public {
        _name = name;
        _symbol = symbol;
        _decimals = 18;
    }
    
    function constructor1 (string memory name, string memory symbol) internal {
        _name = name;
        _symbol = symbol;
        _decimals = 18;
    }

    /**
     * @dev Returns the name of the token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5,05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * Ether and Wei. This is the value {ERC20} uses, unless {_setupDecimals} is
     * called.
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }

    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }

    /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }

    /**
     * @dev See {IERC20-approve}.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {ERC20}.
     *
     * Requirements:
     *
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     * - the caller must have allowance for ``sender``'s tokens of at least
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }

    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue, "ERC20: decreased allowance below zero"));
        return true;
    }

    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     *
     * This is internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * Requirements:
     *
     * - `sender` cannot be the zero address.
     * - `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }

    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.
     *
     * This internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    /**
     * @dev Sets {decimals} to a value other than the default one of 18.
     *
     * WARNING: This function should only be called from the constructor. Most
     * applications that interact with token contracts will not expect
     * {decimals} to ever change, and may work incorrectly if it does.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }

    /**
     * @dev Hook that is called before any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be to transferred to `to`.
     * - when `from` is zero, `amount` tokens will be minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}

interface IUniswapV2Callee {
    function uniswapV2Call(address sender, uint amount0, uint amount1, bytes calldata data) external;
}

interface IUniswapV2ERC20 {

}

interface IUniswapV2Factory {
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);

    function createPair(address tokenA, address tokenB) external returns (address pair);
}

interface IUniswapV2Router01 {
    function factory() external pure returns (address);
    function WETH() external pure returns (address);

    
}

interface IUniswapV2Router02 is IUniswapV2Router01 {}

interface IUniswapV2Pair {
    event Approval(address indexed owner, address indexed spender, uint value);
    event Transfer(address indexed from, address indexed to, uint value);

    function name() external pure returns (string memory);
    function symbol() external pure returns (string memory);
    function decimals() external pure returns (uint8);
    function totalSupply() external view returns (uint);
    function balanceOf(address owner) external view returns (uint);
    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint value) external returns (bool);
    function transfer(address to, uint value) external returns (bool);
    function transferFrom(address from, address to, uint value) external returns (bool);

    function DOMAIN_SEPARATOR() external view returns (bytes32);
    function PERMIT_TYPEHASH() external pure returns (bytes32);
    function nonces(address owner) external view returns (uint);

    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;

    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
    event Sync(uint112 reserve0, uint112 reserve1);

    function MINIMUM_LIQUIDITY() external pure returns (uint);
    function factory() external view returns (address);
    function token0() external view returns (address);
    function token1() external view returns (address);
    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
    function price0CumulativeLast() external view returns (uint);
    function price1CumulativeLast() external view returns (uint);
    function kLast() external view returns (uint);

    function mint(address to) external returns (uint liquidity);
    function burn(address to) external returns (uint amount0, uint amount1);
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;
    function skim(address to) external;
    function sync() external;

    function initialize(address, address) external;
}

interface IWETH {
    function deposit() external payable;
    function transfer(address to, uint value) external returns (bool);
    function withdraw(uint) external;

    event Deposit(address indexed dst, uint256 wad);
    event Withdrawal(address indexed src, uint256 wad);
}

interface kKushV2 {
    function kseedV2LPStaked(address, uint256) external;   
    function kseedV2LPUnstaked(address, uint256) external;
    function kOGV2LPStaked(address, uint256) external;
    function kOGV2LPUnstaked(address, uint256) external;
}

contract Proxiable {
    // Code position in storage is keccak256("PROXIABLE") = "0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7"

    function updateCodeAddress(address newAddress) internal {
        require(
            bytes32(0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7) == Proxiable(newAddress).proxiableUUID(),
            "Not compatible"
        );
        assembly { // solium-disable-line
            sstore(0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7, newAddress)
        }
    }
    function proxiableUUID() public pure returns (bytes32) {
        return 0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7;
    }
}

contract LibraryLockDataLayout {
  bool public initialized = false;
}

contract LibraryLock is LibraryLockDataLayout {
    // Ensures no one can manipulate the Logic Contract once it is deployed.
    // PARITY WALLET HACK PREVENTION

    modifier delegatedOnly() {
        require(initialized == true, "The library is locked. No direct 'call' is allowed");
        _;
    }
    function initialize() internal {
        initialized = true;
    }
}

contract kSeedV2DataLayout is LibraryLock {
    address public owner;
    address public fundAddress;
    address public kkushV2;
    uint256 public lastBlockSent;
    uint256 public totalkSeedV1Swapped;
    
    address public kseedV1;
    address public kseedV2LP;
    address public kOGV2LP;
    
    uint256 public rewardsPercentage;
    
    // Track user's staked kSEED LP
    struct stakeTracker {
        uint256 stakedkseedV2LP;
        uint256 stakedkushOGV2LP;
        uint256 kseedV2Rewards;
        uint256 lastBlockChecked;
        uint256 blockStaked;
    }
    mapping(address => stakeTracker) public userStake;

    struct lpRestriction {
        bool restricted;
    }
    mapping(address => lpRestriction) public restrictedLP;
    
    uint256 public ETHLGEEndBlock;
    uint256 public totalkSeedSupplied;
    uint256 public totalETHSupplied;
    uint256 public lpTokensGenerated;
    bool public isETHLGEOver;
    
    struct ETHLGETracker {
        uint256 kSEEDContributed;
        uint256 ETHContributed;
        bool claimed;
    }
    mapping(address => ETHLGETracker) public userETHLGE;
    
    address public votingContract;
    
    address public kseedV1LP;
    
    address public kushNFT;
    address public kOGV2;

    using SafeMath for uint112;

    bool isVotingStakingLive;

    uint256 public lastLPCount;
    uint256 public kseedPoolMax;

    uint256 public kseedRewardsPerDay;
    uint256 public rewardsClaimed;
    uint256 public lastkSeedCheckpoint;

    struct rewardsSync {
      uint256 currentStakerCheckpoint;
      uint256 currentContractkSeedHeld;
    }
    mapping(address => rewardsSync) public rSync;
    uint256 public initialkSeedCheckpoint;
    uint256 public initialContractkSeedHeld;
    bool public checkpointReset;
    uint256 public totalkSeedV2Held;

    bool public rewardsWithdrawalPaused;
    struct rewardsReset {
      bool isRewardsReset;
    }
    mapping(address => rewardsReset) public rReset;
    uint256 public miningDifficulty; //initial difficulty
}

contract kSeedV2 is ERC20, kSeedV2DataLayout, Proxiable {

    using SafeERC20 for IERC20;
    using SafeMath for uint256;
    
    modifier _onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    //modifier for updating staker rewards
    modifier _updateRewards() {
        if (!rReset[msg.sender].isRewardsReset) {
          userStake[msg.sender].lastBlockChecked = initialkSeedCheckpoint;
          userStake[msg.sender].kseedV2Rewards = 0;
          rReset[msg.sender].isRewardsReset = true;
        }
        if (miningDifficulty < 250000) {
          miningDifficulty = 250000;
        }

        if (block.number > userStake[msg.sender].lastBlockChecked) {
            uint256 rewardBlocks = block.number.sub(userStake[msg.sender].lastBlockChecked);
            uint256 stakedAmount = userStake[msg.sender].stakedkseedV2LP;
            if (userStake[msg.sender].stakedkushOGV2LP > 0) {
                stakedAmount = stakedAmount.add(userStake[msg.sender].stakedkushOGV2LP);
            }
            if (userStake[msg.sender].stakedkushOGV2LP > 0) {
                uint256 reward = stakedAmount.mul(rewardBlocks) / miningDifficulty;
                userStake[msg.sender].kseedV2Rewards = userStake[msg.sender].kseedV2Rewards.add(reward);
                userStake[msg.sender].lastBlockChecked = block.number;
            }
            
        }

        _;
    }
    
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event kseedV1Swapped(address indexed user, uint256 amount);
    event kseedV2LPStaked(address indexed user, uint256 amount);
    event kseedV2LPUnstaked(address indexed user, uint256 amount);
    event kOGV2LPStaked(address indexed user, uint256 amount);
    event kOGV2LPUnstaked(address indexed user, uint256 amount);
    event kseedV2RewardsClaimed(address indexed user, uint256 amount);
    event transferFeeSubtracted(address indexed user, uint256 amount);
    event kseedV2LPAddressSet(address newAddress);
    event kOGV2LPAddressSet(address newAddress);
    event logicContractUpdated(address newAddress);
    event kSeedFundAddressSet(address newAddress);


    constructor() public payable ERC20("Kush.Finance V2", "kSEED-2") {
        
    }
    
    function kseedConstructor(address _kseedV1, address _fundAddress, uint256 _rewardsPercentage, uint256 _ETHLGEEndBlock) public  {
        require(!initialized);
        constructor1("Kush.Finance V2", "kSEED-2");
        rewardsPercentage = _rewardsPercentage;
        kseedV1 = _kseedV1;
        fundAddress = _fundAddress;
        lastBlockSent = block.number;
        owner = msg.sender;
        ETHLGEEndBlock = _ETHLGEEndBlock;
        initialize();
    }
    
    /** @notice Sets contract owner.
      * @param _owner  Address of the new owner.
      */
    function setOwner(address _owner) public _onlyOwner delegatedOnly  {
        owner = _owner;
        
        
    }
    
    /** @notice Updates the logic contract.
      * @param newCode  Address of the new logic contract.
      */
    function updateCode(address newCode) public _onlyOwner delegatedOnly  {
        updateCodeAddress(newCode);
        
        emit logicContractUpdated(newCode);
    }
    
    /** @notice Swaps an amount kSEEDV1 for kSEEDV2.
      * @param _amount Amount of kSEED being swapped.
      */
    function swapkSeedV1(uint256 _amount) public delegatedOnly {
       require(isETHLGEOver, "ETH LGE is ongoing");
       IERC20(kseedV1).safeTransferFrom(msg.sender, address(this), _amount);
       uint256 currentBalance = balanceOf(msg.sender);
       _mint(msg.sender, _amount);
       require(balanceOf(msg.sender).sub(currentBalance) == _amount, "Swap failed");
       totalkSeedV1Swapped = totalkSeedV1Swapped.add(_amount);
       
       emit kseedV1Swapped(msg.sender, _amount);
    }
    
    /** @notice Stake an amount of kSEEDV2 LP tokens.
      * @param _amount Amount of liquidity tokens being staked.
      */
    function stakekSeedV2LP(uint256 _amount) public _updateRewards delegatedOnly {
       IERC20(kseedV2LP).safeTransferFrom(msg.sender, address(this), _amount);
       userStake[msg.sender].stakedkseedV2LP = userStake[msg.sender].stakedkseedV2LP.add(_amount);
       userStake[msg.sender].blockStaked = block.number;
       //Notify kKush 2.0 contract
       kKushV2(kkushV2).kseedV2LPStaked(msg.sender, _amount);
       
       emit kseedV2LPStaked(msg.sender, _amount);
    }
    
    /** @notice Unstake an amount of kSEEDV2 LP tokens.
      * @param _amount Amount of liquidity tokens being unstaked.
      */
    function unstakekseedV2LP(uint256 _amount) public _updateRewards delegatedOnly {
       require(_amount <= userStake[msg.sender].stakedkseedV2LP, "Insufficient stake balance");
       IERC20(kseedV2LP).safeTransfer(msg.sender, _amount);
       userStake[msg.sender].stakedkseedV2LP = userStake[msg.sender].stakedkseedV2LP.sub(_amount);

       //Notify kKush 2.0 contract
       kKushV2(kkushV2).kseedV2LPUnstaked(msg.sender, _amount);
       
       emit kseedV2LPUnstaked(msg.sender, _amount);
    }
    
    /** @notice Stake an amount of kushOGV2 LP tokens.
      * @param _amount Amount of liquidity tokens being staked.
      */
    function stakekushOGV2LP(uint256 _amount) public _updateRewards delegatedOnly {
       IERC20(kOGV2LP).safeTransferFrom(msg.sender, address(this), _amount);
       userStake[msg.sender].stakedkushOGV2LP = userStake[msg.sender].stakedkushOGV2LP.add(_amount);

       //Notify kKush 2.0 contract
       kKushV2(kkushV2).kOGV2LPStaked(msg.sender, _amount);
       
       emit kOGV2LPStaked(msg.sender, _amount);
    }
    
    /** @notice Unstake an amount of kushOGV2 LP tokens.
      * @param _amount Amount of liquidity tokens being unstaked.
      */
    function unstakekushOGV2LP(uint256 _amount) public _updateRewards delegatedOnly {
       require(_amount <= userStake[msg.sender].stakedkushOGV2LP, "Insufficient stake balance");
       IERC20(kOGV2LP).safeTransfer(msg.sender, _amount);
       userStake[msg.sender].stakedkushOGV2LP = userStake[msg.sender].stakedkushOGV2LP.sub(_amount);

       //Notify kKUSH 2.0 contract
        kKushV2(kkushV2).kOGV2LPUnstaked(msg.sender, _amount);
       
       emit kOGV2LPUnstaked(msg.sender, _amount);
    }
    
    /** @notice Get where last block the voter staked was.
      * @param _voter Address of the voter.
      */
    function getVoterBlockStaked(address _voter) delegatedOnly public view returns(uint256) {
        return userStake[_voter].blockStaked;
    }
    
    function viewkSEEDRewards(address staker) delegatedOnly public view returns(uint256) {
        uint256 currentRewards = userStake[staker].kseedV2Rewards;
        uint256 stakerLastBlock = userStake[staker].lastBlockChecked;
        if (!rReset[staker].isRewardsReset) {
          stakerLastBlock = initialkSeedCheckpoint;
          currentRewards = 0;
        } else {
          stakerLastBlock = userStake[staker].lastBlockChecked;
        }

        if (block.number > stakerLastBlock) {
            uint256 rewardBlocks = block.number.sub(stakerLastBlock);
            
            uint256 stakedAmount = userStake[staker].stakedkseedV2LP;
            if (userStake[staker].stakedkushOGV2LP > 0) {
                stakedAmount = stakedAmount.add(userStake[staker].stakedkushOGV2LP);
            }
            if (userStake[staker].stakedkseedV2LP > 0) {
                uint256 reward = stakedAmount.mul(rewardBlocks) / miningDifficulty;
                currentRewards = currentRewards.add(reward);
                
            }
            
        }

        return currentRewards;
    } 
    
    /** @notice Get the kSEED rewards of msg.sender.*/
    function getkSeedRewards() public _updateRewards delegatedOnly {
       require(!rewardsWithdrawalPaused);
       require(userStake[msg.sender].kseedV2Rewards > 0, "Zero rewards balance");
       IERC20(address(this)).safeTransfer(msg.sender, userStake[msg.sender].kseedV2Rewards);
       
       emit kseedV2RewardsClaimed(msg.sender, userStake[msg.sender].kseedV2Rewards);
       userStake[msg.sender].kseedV2Rewards = 0;
    }
    
    /** @notice Override ERC20 transfer function with transfer fee and LP algo.
      * @param _recipient Recepient of the transfer.
      * @param _amount Amount of tokens being transferred.
      */
    function transfer(address _recipient, uint256 _amount) delegatedOnly public override returns(bool) {    
        uint256 transferFee = _amount.div(100);


        if((msg.sender == uniswapRouterV2) || (msg.sender == kseedV2LP)) {
          // Check if the recipient is an address that has staked or holds LP
          require(ERC20(kseedV2LP).balanceOf(_recipient) == 0, "Recipient holds kSEED-2 liquidity.");
          require(lastLPCount <= ERC20(kseedV2LP).totalSupply());
        }
        // require(ERC20(kseedV2LP).balanceOf(_recipient) == 0, "Recipient holds kSEED-2.0 liquidity.");
        if((_recipient == uniswapRouterV2) || (_recipient == kseedV2LP)) {
          // Check if the recipient is an address that has staked or holds LP
          require(ERC20(kseedV2LP).balanceOf(_recipient) == 0, "Recipient holds kSEED-2 liquidity.");
          
        }

        lastLPCount = ERC20(kseedV2LP).totalSupply();
        emit transferFeeSubtracted(msg.sender, transferFee);
        super.transfer(address(this), transferFee);
        return super.transfer(_recipient, _amount.sub(transferFee));
    }
    
    /** @notice Override ERC20 transferFrom function with transfer fee.
      * @param _sender Owner of the tokens being transferred.
      * @param _recipient Recepient of the transfer.
      * @param _amount Amount of tokens being transferred.
      */
    function transferFrom(address _sender, address _recipient, uint256 _amount) delegatedOnly public override returns(bool) {
        uint256 transferFee = _amount.div(100);

        if((msg.sender == uniswapRouterV2) || (msg.sender == kseedV2LP)) { 
          require(ERC20(kseedV2LP).balanceOf(_sender) == 0, "Recipient holds kSEED-2 liquidity.");
          // require(userStake[msg.sender].kseedV2LPStaked == 0);
        }

        if ((_recipient == uniswapRouterV2) || (_recipient == kseedV2LP)) {
          // Check if the recipient is an address that has staked or holds LP
          require(ERC20(kseedV2LP).balanceOf(_sender) == 0, "Recipient holds kSEED-2 liquidity.");
       
        }
        
        emit transferFeeSubtracted(msg.sender, transferFee);
        super.transferFrom(_sender, address(this), transferFee);
        return super.transferFrom(_sender, _recipient, _amount.sub(transferFee));
    }
    
    /** @notice Set the address for the kseedV2 liquidity token.
      * @param _V2LP Address of the liquidity token.
      */
    function setkSeedV2LPAddress(address _V2LP) public _onlyOwner delegatedOnly {
       kseedV2LP = _V2LP;
       
       emit kseedV2LPAddressSet(_V2LP);
    }  
    
    // /** @notice Set the address for the dkseedV2 liquidity token.
    //   * @param _V2LP Address of the liquidity token.
    //   */
    // function setDkseedV2LPAddress(address _V2LP) public _onlyOwner delegatedOnly {
    //    dkseedV2LP = _V2LP;
       
    //    emit dkseedV2LPAddressSet(_V2LP);
    // } 
    
    // /** @notice Set the address for the kseed Fund.
    //   * @param _fund Address of the kseed Fund.
    //   */
    // function setkseedFundAddress(address _fund) public _onlyOwner delegatedOnly {
    //    fundAddress = _fund;
       
    //    emit kseedFundAddressSet(_fund);
    // } 
    
    event UniswapAddressesSet(address factory, address router);
    event LGEEndBlockSet(uint256 block);
    event kSeedxETHSupplied(address indexed user, uint256 kseedAmount, uint256 ETHAmount);
    
    
    
    address public uniswapRouterV2;
    address public uniswapFactory;
    
    // /** @notice Set the Uniswap Factory and Router addresses.
    //   * @param _factory Uniswap Factory address.
    //   * @param _router Uniswap Router address.
    //   */
    // function setUniswapV2Addresses(address _factory, address _router) public _onlyOwner delegatedOnly {
    //    uniswapFactory = _factory;
    //    uniswapRouterV2 = _router;
       
    //    emit UniswapAddressesSet(uniswapFactory, uniswapRouterV2);
    // } 
    
    // /** @notice Set the end block for the ETH LGE.
    //   * @param _block Block Number.
    //   */
    // function setLGEEndBlock(uint256 _block) public _onlyOwner delegatedOnly {
    //    ETHLGEEndBlock = _block;
       
    //    emit LGEEndBlockSet(_block);
    // } 
    
    /** @notice Set the kseedV2LP address.
      */
    function getV2UniPair() public returns (address) {
        require(kseedV2LP == address(0));
          kseedV2LP = IUniswapV2Factory(uniswapFactory).createPair(
          address(IUniswapV2Router02(uniswapRouterV2).WETH()),
          address(this)
        ); 
        restrictedLP[kseedV2LP].restricted = true;
        return kseedV2LP;
    }
    
    /** @notice Add kseedV1 and ETH to the contract.
      * @param _kseedAmount Amount of kseedV1 to add.
      */
    // function addkseedAndETH(uint256 _kseedAmount) public payable delegatedOnly {
    //   require(!isETHLGEOver, "ETH LGE is over");
    //   require (_kseedAmount > 0, "Insufficient kseed");
    //   uint256 ETHFee = _kseedAmount.div(10);
    //   require(ETHFee <= msg.value, "Insufficient ETH");
    //   IERC20(kseedV1).safeTransferFrom(msg.sender, address(this), _kseedAmount);
    //   _mint(address(this), _kseedAmount);
    //   totalkseedV1Swapped = totalkseedV1Swapped.add(_kseedAmount);
    //   userETHLGE[msg.sender].kseedContributed = userETHLGE[msg.sender].kseedContributed.add(_kseedAmount);
    //   userETHLGE[msg.sender].ETHContributed = userETHLGE[msg.sender].ETHContributed.add(msg.value);
    //   totalkseedSupplied = totalkseedSupplied.add(_kseedAmount);
    //   totalETHSupplied = totalETHSupplied.add(msg.value);
    //   emit kseedxETHSupplied(msg.sender, _kseedAmount, msg.value);
    // } 
    
    /** @notice Initialize the kseedV2/ETH pool on UniswapV2.
      */
    // function initializeV2ETHPool() public {
    //     require(block.number >= ETHLGEEndBlock, "The ETH LGE has not ended");
    //     require(!isETHLGEOver, "ETH LGE complete");
    
    //     IUniswapV2Pair v1LP = IUniswapV2Pair(kseedV1LP);
    //     uint112 v1ETH;
    //     uint112 v1kseed;
    //     uint32 lastTimestamp;
    //     (v1ETH, v1kseed, lastTimestamp) = v1LP.getReserves();
    //     uint256 lgeETHxV1kseed = address(this).balance.mul(v1kseed);
    //     uint256 divV1ETH = lgeETHxV1kseed.div(v1ETH);
        
    //     IUniswapV2Pair v2LP = IUniswapV2Pair(kseedV2LP);
    //     address WETH = IUniswapV2Router02(uniswapRouterV2).WETH();
    //     uint256 ETHBalance = address(this).balance;
    //     IWETH(WETH).deposit{value: ETHBalance}();
    //     IWETH(WETH).transfer(address(v2LP), ETHBalance);
    //     ERC20(address(this)).transfer(address(v2LP), divV1ETH);
    //     v2LP.mint(address(this));
        
    //     require(ERC20(kseedV2LP).balanceOf(address(this)) > 0, "LP generation failed");
    //     lpTokensGenerated = ERC20(kseedV2LP).balanceOf(address(this));
    //     isETHLGEOver = true;
    // }
    
    /** @notice Allows an LGE participant to claim a portion of kseedV2/ETH LP held by the contract.
      */
    function claimETHLP() public {
        require(isETHLGEOver, "ETH/KSEED LGE is still ongoing");
        require(userETHLGE[msg.sender].kSEEDContributed > 0);
        require(!userETHLGE[msg.sender].claimed);
        uint256 claimableLP = userETHLGE[msg.sender].kSEEDContributed.mul(lpTokensGenerated).div(totalkSeedSupplied);
        ERC20(kseedV2LP).transfer(msg.sender, claimableLP);
        string memory tier;
        if (userETHLGE[msg.sender].ETHContributed < 3000000000000000000) {
            tier = "COMMON";
        }
        if (userETHLGE[msg.sender].ETHContributed < 6000000000000000000) {
            tier = "UNCOMMON";
        }
        if (userETHLGE[msg.sender].ETHContributed < 18000000000000000000) {
            tier = "RARE";
        }
        if (userETHLGE[msg.sender].ETHContributed < 36000000000000000000) {
            tier = "EPIC";
        }
        if (userETHLGE[msg.sender].ETHContributed > 36000000000000000000) {
            tier = "LEGENDARY";
        }
        KushNFT(kushNFT).createNFT(msg.sender, tier);
        userETHLGE[msg.sender].claimed = true;
    }
    

    /** @notice Allows an LGE participant to claim a portion of kSeedV2/ETH LP held by the contract and stake it.
      */
    function claimETHLPAndStake() public {
        require(isETHLGEOver, "ETH LGE is still ongoing");
        require(userETHLGE[msg.sender].kSEEDContributed > 0);
        require(!userETHLGE[msg.sender].claimed);
        uint256 claimableLP = userETHLGE[msg.sender].kSEEDContributed.mul(lpTokensGenerated).div(totalkSeedSupplied);
        string memory tier;
        if (userETHLGE[msg.sender].ETHContributed < 3000000000000000000) {
            tier = "COMMON";
        }
        if (userETHLGE[msg.sender].ETHContributed < 6000000000000000000) {
            tier = "UNCOMMON";
        }
        if (userETHLGE[msg.sender].ETHContributed < 18000000000000000000) {
            tier = "RARE";
        }
        if (userETHLGE[msg.sender].ETHContributed < 36000000000000000000) {
            tier = "EPIC";
        }
        if (userETHLGE[msg.sender].ETHContributed >= 36000000000000000000) {
            tier = "LEGENDARY";
        }
        KushNFT(kushNFT).createNFT(msg.sender, tier);
        
        userStake[msg.sender].stakedkseedV2LP = userStake[msg.sender].stakedkseedV2LP.add(claimableLP);
        userStake[msg.sender].blockStaked = block.number;
        //Notify kKush 2.0 contract
        kKushV2(kkushV2).kseedV2LPStaked(msg.sender, userStake[msg.sender].stakedkseedV2LP);
        if (isVotingStakingLive) {
          kseedVoting(votingContract).kseedV2LPStaked(userStake[msg.sender].stakedkseedV2LP, msg.sender);
        }
        userETHLGE[msg.sender].claimed = true;
    }
    
    // /** @notice Sets an address for the kSEED V1 LP contract.
    //   * @param _kseedV1LP Address of the kSEED V1 LP contract
    //   */
    // function setkseedV1LPAddress(address _kseedV1LP) public _onlyOwner {
    //     kseedV1LP = _kseedV1LP;
    // }
    
    // /** @notice Sets an address for the kseedNFT contract.
    //   * @param _kseedNFT Address of the kseedNFT contract
    //   */
    function setKushNFTAddress(address _kushNFT) public _onlyOwner {
        kushNFT = _kushNFT;
    }

    /** @notice Sets an address for the Catnip V2 contract.
      * @param _kkushV2 Address of the Catnip V2 contract
      */
    function setkKUSHV2(address _kkushV2) public _onlyOwner {
        kkushV2 = _kkushV2;
    }
    
    // /** @notice Sets an address for the Dkseed V2 contract.
    //   * @param _dkseedV2 Address of the Dkseed V2 contract
    //   */
    // function setDkseedV2(address _dkseedV2) public _onlyOwner {
    //     dkseedV2 = _dkseedV2;
    // }

    /** @notice Sets if the Voting contract is live.
      * @param _isVoting bool
      */
    function setIsVoting(bool _isVoting) public _onlyOwner {
        isVotingStakingLive = _isVoting;
    }

    /** @notice Sets the Voting contract address.
      * @param _addr Voting contract address
      */
    function setVotingContract(address _addr) public _onlyOwner {
        votingContract = _addr;
    }

    function updateRewards() public _updateRewards {

    }

    function setIsRewarding(bool _isRewarding) public _onlyOwner {
      rewardsWithdrawalPaused = _isRewarding;
      
    }

    function setLastLPCount() public _onlyOwner {
      lastLPCount = ERC20(kseedV2LP).totalSupply();
    }

    function setInitialCheckpoint(uint256 _block) public _onlyOwner {
      initialkSeedCheckpoint = _block;
    }

    function setMiningDifficulty(uint256 _amount) public _onlyOwner {
      miningDifficulty = _amount;
    }


}

interface kseedVoting {
    function kseedV2LPStaked(uint256, address) external;
    function kseedV2LPUnstaked(uint256, address) external;
}

interface KushNFT {
    function createNFT(address, string calldata) external;
}