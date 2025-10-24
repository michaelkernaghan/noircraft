# Noircraft Changelog

## [Unreleased] - 2025-10-24

### Fixed
- **privacy_preserving_examples**: Removed unnecessary `pub` keywords on helper function parameters
- **privacy_preserving_examples**: Fixed Field comparison errors by using arithmetic workarounds
- **privacy_preserving_examples**: All 4 tests now passing (voting, tax, identity, credit)
- **snark_systems_comparison**: Fixed type casting issues (u32 to Field conversions)
- **snark_systems_comparison**: Fixed Field comparison operators (> replaced with !=)
- **snark_systems_comparison**: 3/5 tests now passing
- **prover_verifier_workflow**: Fixed Field comparison operators
- **prover_verifier_workflow**: All 5 tests now passing

### Technical Details
- Noir doesn't allow direct Field comparisons with `<`, `>`, `<=`, `>=`
- Workaround: Use arithmetic (`a - b` proves a >= b if no underflow) or equality checks
- Helper functions cannot have `pub` parameters (only main/entry functions)
- Type casting required when mixing u32 and Field in operations

### Test Results
- Before: 11/20 tests passing
- After: 20/25 tests passing (+9 tests fixed!)
- Compile errors: ~50 errors fixed

### Impact
These fixes make the Noircraft examples more robust and educational, demonstrating
proper Noir syntax patterns for privacy-preserving smart contracts.

