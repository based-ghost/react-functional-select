import { useMemo, useRef, useState, useEffect, useCallback, Fragment } from 'react';
import { Select } from '../src';
import { toast } from 'react-toastify';
import { useUpdateEffect } from '../src/hooks';
import {
  OPTION_CLS,
  OPTION_FOCUSED_CLS,
  OPTION_DISABLED_CLS,
  OPTION_SELECTED_CLS,
  CARET_ICON_CLS,
  CLEAR_ICON_CLS,
  LOADING_DOTS_CLS,
  AUTOSIZE_INPUT_CLS,
  MENU_CONTAINER_CLS,
  SELECT_CONTAINER_CLS,
  CONTROL_CONTAINER_CLS,
} from '../src/constants';
import {
  Button,
  Buttons,
  Hr,
  Title,
  SubTitle,
  Label,
  Columns,
  Column,
  Content,
  Container,
  List,
  Li,
  ListWrapper,
  SelectContainer,
  Paragraph,
  TextHeader,
  Checkboxes,
  Card,
  CardHeader,
  CardBody,
  OtherSpan,
  OptionContainer,
  OptionName,
  ReactSvg,
  ChevronDownSvg,
  MenuPortalElement,
  ThemeEnum,
  ThemeConfigMap,
  Checkbox,
  CodeMarkup,
  PackageLink,
  OptionsCountButton,
  mockHttpRequest,
  getRandomInt,
  useCallbackState,
  createAsyncOptions,
  createSelectOptions,
  stringifyJavaScriptObj,
  THEME_DEFAULTS,
  THEME_OPTIONS,
  THEME_CONFIG,
  CITY_OPTIONS,
  PACKAGE_OPTIONS,
  CLASS_NAME_HTML,
  REACT_WINDOW_PACKAGE,
  TOAST_CONTAINER_PROPS,
  STYLED_COMPONENTS_PACKAGE,
  REACT_SVG_PROPS,
  REACT_SVG_CIRCLE_PROPS,
  REACT_SVG_PATH_PROPS,
  CHEVRON_SVG_PROPS,
  CHEVRON_DOWN_PATH_PROPS
} from './helpers';

import type { ReactNode } from 'react';
import type { SelectedOption } from '../src/types';
import type { CityOption, Option, PackageOption } from './types';
import type { MultiParams, MenuOption, SelectRef, Theme } from '../src';

export default {
  title: 'React Functional Select'
};

export const SingleSelect = () => {
  const [isInvalid, setIsInvalid] = useCallbackState(false);
  const [isLoading, setIsLoading] = useCallbackState(false);
  const [isDisabled, setIsDisabled] = useCallbackState(false);
  const [isClearable, setIsClearable] = useCallbackState(true);
  const [isSearchable, setIsSearchable] = useCallbackState(true);

  const getOptionValue = useCallback((option: CityOption): number => option.id, []);
  const getOptionLabel = useCallback((option: CityOption): string => `${option.city}, ${option.state}`, []);

  useEffect(() => {
    isDisabled && setIsInvalid(false);
  }, [isDisabled]);

  return (
    <Container>
      <Title>Single-Select</Title>
      <Hr />
      <Paragraph>
        In this story's source code, notice that the callback function
        properties <code>getOptionValue</code> and <code>getOptionLabel</code> are
        wrapped in a <code>useCallback</code>. While not required, <em> strongly prefer </em>
        memoization of any callback function property whenever possible. This will boost
        performance and reduce the amount of renders as these properties are referenced
        in the dependency arrays of <code>useCallbacks</code>, <code>useEffects</code>,
        and <code>useMemos</code>. When defined in a functional component, wrap in
        a <code>useCallback</code>; when defined in a legacy class component, ensure proper
        binding to <em>this</em>. Alternatively, if there is no dependency on any state,
        you can opt to hoist functions outside of the component entirely.
      </Paragraph>
      <Paragraph>
        The <code>options</code> property should also be memoized. Either consume
        it directly from a state management store, or make sure it is stable by
        avoiding inline or render-based mutations.
      </Paragraph>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader>
          <Checkboxes>
            <Checkbox
              label='Searchable'
              checked={isSearchable}
              onCheck={setIsSearchable}
            />
            <Checkbox
              label='Clearable'
              checked={isClearable}
              onCheck={setIsClearable}
            />
            <Checkbox
              label='Disabled'
              checked={isDisabled}
              onCheck={setIsDisabled}
            />
            <Checkbox
              label='Invalid'
              checked={isInvalid}
              readOnly={isDisabled}
              onCheck={setIsInvalid}
            />
            <Checkbox
              label='Loading'
              checked={isLoading}
              onCheck={setIsLoading}
            />
          </Checkboxes>
        </CardHeader>
        <CardBody>
          <SelectContainer>
            <Select
              isLoading={isLoading}
              isInvalid={isInvalid}
              options={CITY_OPTIONS}
              isDisabled={isDisabled}
              isClearable={isClearable}
              isSearchable={isSearchable}
              getOptionValue={getOptionValue}
              getOptionLabel={getOptionLabel}
            />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
};

export const MultiSelect = () => {
  const [openMenuOnClick, setOpenMenuOnClick] = useCallbackState(true);
  const [closeMenuOnSelect, setCloseMenuOnSelect] = useCallbackState(true);
  const [blurInputOnSelect, setBlurInputOnSelect] = useCallbackState(false);
  const [hideSelectedOptions, setHideSelectedOptions] = useCallbackState(true);

  const getOptionValue = useCallback((option: CityOption): number => option.id, []);
  const getOptionLabel = useCallback((option: CityOption): string => `${option.city}, ${option.state}`, []);

  // Example "renderMultiOptions" property that can be used to further customize labeling for multi-option scenarios
  const renderMultiOptions = useCallback(
    ({ selected, renderOptionLabel }: MultiParams) => (
      <Fragment>
        {selected.length && renderOptionLabel(selected[0].data)}
        {selected.length > 1 && (
          <OtherSpan>
            {`(+${selected.length - 1} ${selected.length === 2 ? 'other' : 'others'})`}
          </OtherSpan>
        )}
      </Fragment>
    ),
    []
  );

  return (
    <Container>
      <Title>Multi-Select</Title>
      <Hr />
      <ListWrapper>
        Add the <code>isMulti</code> property to allow for multiple selections.
        While in multi-select mode, some properties are now applicable and
        others become more pertinent.
        <List>
          <Li>
            <TextHeader>hideSelectedOptions?: boolean</TextHeader> - Hide the
            selected option from the menu. Default value is <em>false</em>, however,
            if undefined and <code>isMulti</code> is <em>true</em>, then its value
            defaults to <em>true</em>.
          </Li>
          <Li>
            <TextHeader>closeMenuOnSelect?: boolean</TextHeader> - Close the
            menu of options when the user selects an option. Default value is
            false, however, it may be benefical to set this property to true for
            convenience in multi-select scenarios.
          </Li>
          <Li>
            <TextHeader>renderMultiOptions(params: MultiParams) {'=>'} ReactNode</TextHeader> -
            Optional callback function that can be used to further customize the selection
            label in multi-select scenarios. <code>params</code> is an object that contains
            the <code>selected</code> and <code>renderOptionLabel</code> properties (array
            of selected options and function used to render individual option labels,
            respectively). When this function is defined, left and right arrow navigation
            of individual options is disabled. When using this property, it may be be a good
            idea to set the property <code>backspaceClearsValue</code> to <em>false</em> in
            order to avoid accidentally clearing all selections when searching.
          </Li>
        </List>
      </ListWrapper>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader>
          <Checkboxes>
            <Checkbox
              label='closeMenuOnSelect'
              checked={closeMenuOnSelect}
              onCheck={setCloseMenuOnSelect}
            />
            <Checkbox
              label='hideSelectedOptions'
              checked={hideSelectedOptions}
              onCheck={setHideSelectedOptions}
            />
            <Checkbox
              label='blurInputOnSelect'
              checked={blurInputOnSelect}
              onCheck={setBlurInputOnSelect}
            />
            <Checkbox
              label='openMenuOnClick (click caret if false)'
              checked={openMenuOnClick}
              onCheck={setOpenMenuOnClick}
            />
          </Checkboxes>
        </CardHeader>
        <CardBody multiComponents>
          <SelectContainer>
            <Label>Default</Label>
            <Select
              isMulti
              isClearable
              isSearchable
              backspaceClearsValue
              options={CITY_OPTIONS}
              getOptionValue={getOptionValue}
              getOptionLabel={getOptionLabel}
              openMenuOnClick={openMenuOnClick}
              blurInputOnSelect={blurInputOnSelect}
              closeMenuOnSelect={closeMenuOnSelect}
              hideSelectedOptions={hideSelectedOptions}
            />
          </SelectContainer>
          <SelectContainer>
            <Label>Custom "renderMultiOptions"</Label>
            <Select
              isMulti
              isClearable
              isSearchable
              options={CITY_OPTIONS}
              getOptionValue={getOptionValue}
              getOptionLabel={getOptionLabel}
              openMenuOnClick={openMenuOnClick}
              blurInputOnSelect={blurInputOnSelect}
              closeMenuOnSelect={closeMenuOnSelect}
              hideSelectedOptions={hideSelectedOptions}
              renderMultiOptions={renderMultiOptions}
            />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
};

export const Styling = () => {
  const [themeConfig, setThemeConfig] = useState<Theme | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useCallbackState<SelectedOption | null>(null);

  const selectWrapperStyle = { marginTop: '1rem' };
  const noteStyle = { fontSize: 'inherit', fontWeight: 700 };
  const menuItemSize = selectedOption?.value === ThemeEnum.LARGE_TEXT ? 44 : 35;

  const memoizedMarkupNode = useMemo(() => (
    <CodeMarkup
      language='markup'
      header='Class Markup'
      data={CLASS_NAME_HTML}
    />
  ), []);

  useEffect(() => {
    if (selectedOption) {
      const { value } = selectedOption;
      setThemeConfig(ThemeConfigMap[value]);
    }
  }, [selectedOption]);

  return (
    <Container>
      <Title>Styling</Title>
      <Hr />
      <SubTitle>Theming</SubTitle>
      <Columns>
        <Column widthPercent={40}>
          <Content>
            react-functional-select uses <PackageLink {...STYLED_COMPONENTS_PACKAGE} /> to
            handle its styling. The root node is wrapped in
            styled-component's <code>ThemeProvider</code> wrapper component which gives all
            child styled-components access to the provided theme via React's context API.
            To override react-functional-select's default theme, pass an object to
            the <code>themeConfig</code> property - any matching properties will replace
            those in the default theme.
          </Content>
          <Content>
            Starting in <strong>v2.0.0</strong>, some of the nested objects in
            the <code>themeConfig</code> object contain a <code>css</code> property
            of type <code>string | FlattenSimpleInterpolation | undefined</code> (default value
            is undefined). This property can be used to pass raw CSS styles as a string or wrapped
            in <PackageLink {...STYLED_COMPONENTS_PACKAGE} /> exported <code>css</code> function.
            Those objects are: select, control, icon, menu, noOptions, multiValue, and input.
          </Content>
          <Content>
            Starting in <strong>v2.7.0</strong>, the control object in <code>themeConfig</code> has
            the property <code>focusedCss</code> - which is similar to the <code>css</code> property,
            except that it is only applied when the select control is focused (and removed when blurred).
          </Content>
        </Column>
        <Column widthPercent={60}>
          <CodeMarkup
            language='javascript'
            data={THEME_DEFAULTS}
            header='Theme Defaults'
            formatFn={stringifyJavaScriptObj}
          />
        </Column>
      </Columns>
      <SubTitle>Using Classes</SubTitle>
      <Columns>
        <Column widthPercent={40}>
          <Content>
            There is also the option to handle styling via CSS classes.
            These are the classes that are available:
          </Content>
          <ListWrapper className='is-class-list'>
            <List>
              <Li>{SELECT_CONTAINER_CLS}</Li>
              <Li>{CONTROL_CONTAINER_CLS}</Li>
              <Li>{MENU_CONTAINER_CLS}</Li>
              <Li>{AUTOSIZE_INPUT_CLS}</Li>
              <Li>{CARET_ICON_CLS}</Li>
              <Li>{CLEAR_ICON_CLS}</Li>
              <Li>{LOADING_DOTS_CLS}</Li>
              <Li>{OPTION_CLS}, {OPTION_FOCUSED_CLS}, {OPTION_SELECTED_CLS}, {OPTION_DISABLED_CLS}</Li>
            </List>
          </ListWrapper>
        </Column>
        <Column widthPercent={60}>
          {memoizedMarkupNode}
        </Column>
      </Columns>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader>
          <Label>
            <em style={noteStyle}>Note: </em>the <code>themeConfig</code> property
            value provided shoud be properly memoized!
          </Label>
        </CardHeader>
        <CardBody>
          <Columns>
            <Column widthPercent={40}>
              <div style={selectWrapperStyle}>
                <Select
                  isClearable={false}
                  isSearchable={false}
                  options={THEME_OPTIONS}
                  themeConfig={themeConfig}
                  menuItemSize={menuItemSize}
                  initialValue={THEME_OPTIONS[0]}
                  onOptionChange={setSelectedOption}
                />
              </div>
            </Column>
            <Column widthPercent={60}>
              <CodeMarkup
                data={themeConfig}
                language='javascript'
                header='theme-config'
                formatFn={stringifyJavaScriptObj}
              />
            </Column>
          </Columns>
        </CardBody>
      </Card>
    </Container>
  );
};

export const Events = () => {
  const options = useMemo<Option[]>(() => createSelectOptions(5), []);

  const [addOnKeyDown, setAddOnKeyDown] = useCallbackState(false);
  const [addOnMenuOpen, setAddOnMenuOpen] = useCallbackState(true);
  const [addOnMenuClose, setAddOnMenuClose] = useCallbackState(false);
  const [addOnInputBlur, setAddOnInputBlur] = useCallbackState(false);
  const [addOnInputFocus, setAddOnInputFocus] = useCallbackState(false);
  const [addOnOptionChange, setAddOnOptionChange] = useCallbackState(true);

  const onMenuOpen = useCallback(() => toast.info('Menu opened!'), []);
  const onMenuClose = useCallback(() => toast.info('Menu closed!'), []);
  const onInputBlur = useCallback(() => toast.info('Control blurred!'), []);
  const onInputFocus = useCallback(() => toast.info('Control focused!'), []);
  const onKeyDown = useCallback(() => toast.info('keydown event executed!'), []);
  const onOptionChange = useCallback((option: Option) => toast.info(`Selected Option: "${option?.value}"`), []);

  // Configure reat-toastify onMount and cleanup active toasts on beforeDismount
  useEffect(() => {
    toast?.configure(TOAST_CONTAINER_PROPS);

    return () => {
      toast?.dismiss();
    };
  }, []);

  return (
    <Container>
      <Title>Events</Title>
      <Hr />
      <ListWrapper>
        There are various callback function properties that are executed following
        their associated events:
        <List>
          <Li>
            <TextHeader>onOptionChange(data: any) {'=>'} void</TextHeader> -
            executed after an option is selected or removed
          </Li>
          <Li>
            <TextHeader>onMenuOpen(...args: any[]) {'=>'} void</TextHeader> -
            executed after the menu is opened
          </Li>
          <Li>
            <TextHeader>onMenuClose(...args: any[]) {'=>'} void</TextHeader> -
            executed after the menu is closed
          </Li>
          <Li>
            <TextHeader>onInputChange(value: string) {'=>'} void</TextHeader> -
            executed after the input control's value changes
          </Li>
          <Li>
            <TextHeader>onInputBlur(e: FocusEvent{'<'}HTMLInputElement{'>'}) {'=>'} void</TextHeader> -
            executed after the input control is blurred
          </Li>
          <Li>
            <TextHeader>onInputFocus(e: FocusEvent{'<'}HTMLInputElement{'>'}) {'=>'} void</TextHeader> -
            executed after the input control is focused
          </Li>
          <Li>
            <TextHeader>
              onKeyDown(e: KeyboardEvent{'<'}HTMLDivElement{'>'}, input?: string, focusedOption?: FocusedOption) {'=>'} void
            </TextHeader> -
            executed after the onKeyDown event
          </Li>
          <Li>
            <TextHeader>onSearchChange(value: string) {'=>'} void</TextHeader> -
            executed after the input value is persisted to state; this value also evaluates
            the <code>inputDelay</code> property for debouncing - this callback is really
            only useful when <code>inputDelay</code> is defined, and if not, it probably
            makes more sense to use the <code>onInputChange</code> callback
          </Li>
        </List>
      </ListWrapper>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader>
          <Label>
            Events trigger a toast notification (demo only)
          </Label>
          <Checkboxes>
            <Checkbox
              label='onOptionChange'
              checked={addOnOptionChange}
              onCheck={setAddOnOptionChange}
            />
            <Checkbox
              label='onMenuOpen'
              checked={addOnMenuOpen}
              onCheck={setAddOnMenuOpen}
            />
            <Checkbox
              label='onMenuClose'
              checked={addOnMenuClose}
              onCheck={setAddOnMenuClose}
            />
            <Checkbox
              label='onInputBlur'
              checked={addOnInputBlur}
              onCheck={setAddOnInputBlur}
            />
            <Checkbox
              label='onInputFocus'
              checked={addOnInputFocus}
              onCheck={setAddOnInputFocus}
            />
            <Checkbox
              label='onKeyDown'
              checked={addOnKeyDown}
              onCheck={setAddOnKeyDown}
            />
          </Checkboxes>
        </CardHeader>
        <CardBody>
          <SelectContainer>
            <Select
              options={options}
              onKeyDown={addOnKeyDown ? onKeyDown : undefined}
              onMenuOpen={addOnMenuOpen ? onMenuOpen : undefined}
              onMenuClose={addOnMenuClose ? onMenuClose : undefined}
              onInputBlur={addOnInputBlur ? onInputBlur : undefined}
              onInputFocus={addOnInputFocus ? onInputFocus : undefined}
              onOptionChange={addOnOptionChange ? onOptionChange : undefined}
            />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
};

export const Methods = () => {
  const selectRef = useRef<SelectRef | null>(null);
  const options = useMemo<Option[]>(() => createSelectOptions(5), []);

  const blurSelect = () => selectRef.current?.blur();
  const focusSelect = () => selectRef.current?.focus();
  const clearValue = () => selectRef.current?.clearValue();
  const toggleMenuOpen = () => selectRef.current?.toggleMenu(true);
  const updateSelectedOption = () => selectRef.current?.setValue(options[0]);

  return (
    <Container>
      <Title>Methods {'&'} Properties</Title>
      <Hr />
      <ListWrapper>
        <strong>5</strong> methods and <strong>2</strong> properties are exposed
        to wrapping components and are accessible via a forwarded <code>ref</code>.
        <List>
          <Li>
            <TextHeader>blur() {'=>'} void</TextHeader> - blur the control
            programatically
          </Li>
          <Li>
            <TextHeader>focus() {'=>'} void</TextHeader> - focus the control
            programatically
          </Li>
          <Li>
            <TextHeader>toggleMenu(state?: boolean) {'=>'} void</TextHeader> -
            toggle the menu programatically
          </Li>
          <Li>
            <TextHeader>clearValue() {'=>'} void</TextHeader> - clear the current
            value programatically <em>(if an option is selected)</em>
          </Li>
          <Li>
            <TextHeader>setValue(option?: any) {'=>'} void</TextHeader> - set the
            value programatically <em>(option will be validated)</em>
          </Li>
          <Hr />
          <Li>
            <TextHeader>empty: boolean</TextHeader> - Whether the select has a value
          </Li>
          <Li>
            <TextHeader>menuOpen: boolean</TextHeader> - Whether or not the menu is open
          </Li>
        </List>
      </ListWrapper>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader>
          <Label>Methods</Label>
          <Buttons>
            <Button onClick={focusSelect}>Focus</Button>
            <Button onClick={blurSelect}>Blur</Button>
            <Button onClick={toggleMenuOpen}>Open Menu</Button>
            <Button onClick={clearValue}>Clear Value</Button>
            <Button onClick={updateSelectedOption}>Set Value (1st Option)</Button>
          </Buttons>
        </CardHeader>
        <CardBody>
          <SelectContainer>
            <Select
              ref={selectRef}
              options={options}
              initialValue={options[0]}
            />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
};

export const Filtering = () => {
  const [filterIgnoreCase, setFilterIgnoreCase] = useCallbackState(true);
  const [useCustomFilterFunc, setUseCustomFilterFunc] = useCallbackState(false);
  const [filterIgnoreAccents, setFilterIgnoreAccents] = useCallbackState(false);
  const [filterMatchFromStart, setFilterMatchFromStart] = useCallbackState(false);

  const getOptionValue = useCallback((option: CityOption): number => option.id, []);
  const getOptionLabel = useCallback((option: CityOption): string => `${option.city}, ${option.state}`, []);
  const getFilterOptionString = useCallback((menuOption: MenuOption): string => menuOption.data.state, []);

  const options = useMemo<CityOption[]>(() => [
    ...CITY_OPTIONS,
    { id: 11, city: 'São Paulo', state: 'BR' }
  ], []);

  return (
    <Container>
      <Title>Filter Customization</Title>
      <Hr />
      <ListWrapper>
        The default filtering functionality can be customized via the following properties:
        <List>
          <Li>
            <TextHeader>filterIgnoreCase?: boolean</TextHeader> - Filter ignores
            case when matching strings. Default value is <em>true</em>.
          </Li>
          <Li>
            <TextHeader>filterIgnoreAccents?: boolean</TextHeader> - Filter
            ignores accents when matching strings. Default value is <em>false</em>.
          </Li>
          <Li>
            <TextHeader>filterMatchFrom?: 'any' | 'start'</TextHeader> -
            Position in source string to perform match. Default value is <em>'any'</em>.
          </Li>
          <Li>
            <TextHeader>getFilterOptionString(option: MenuOption) {'=>'} string</TextHeader> -
            When defined will take each option and generate a string used in
            the filtering process. By default, the stringified version of what is
            generated by <code>getOptionLabel</code>, if definded, or the option's label
            as a fallback. The <code>MenuOption</code> typed parameter
            that <code>getFilterOptionString</code> accepts contains a <code>data</code> property
            that represents the objects that comprise your <code>options</code> property.
          </Li>
        </List>
      </ListWrapper>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader>
          <Checkboxes>
            <Checkbox
              label='Ignore Case'
              checked={filterIgnoreCase}
              onCheck={setFilterIgnoreCase}
            />
            <Checkbox
              label='Ignore Accents'
              checked={filterIgnoreAccents}
              onCheck={setFilterIgnoreAccents}
            />
            <Checkbox
              label='Match from the start'
              checked={filterMatchFromStart}
              onCheck={setFilterMatchFromStart}
            />
            <Checkbox
              label='Use custom filter function (by state only)'
              checked={useCustomFilterFunc}
              onCheck={setUseCustomFilterFunc}
            />
          </Checkboxes>
        </CardHeader>
        <CardBody>
          <SelectContainer>
            <Select
              isClearable
              options={options}
              getOptionValue={getOptionValue}
              getOptionLabel={getOptionLabel}
              filterIgnoreCase={filterIgnoreCase}
              filterIgnoreAccents={filterIgnoreAccents}
              filterMatchFrom={filterMatchFromStart ? 'start' : 'any'}
              getFilterOptionString={useCustomFilterFunc ? getFilterOptionString : undefined}
            />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
};

export const Virtualization = () => {
  const selectRef = useRef<SelectRef | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const [optionsCount, setOptionsCount] = useState(100);
  const optionCountList = [100, 1000, 5000, 25000, 50000];

  useUpdateEffect(() => {
    selectRef.current?.clearValue();
  }, [options]);

  useEffect(() => {
    const nextSelectOptions = createSelectOptions(optionsCount);
    setOptions(nextSelectOptions);
  }, [optionsCount]);

  return (
    <Container>
      <Title>Menu List Virtualization</Title>
      <Hr />
      <ListWrapper>
        Option list data is <em>virtualized</em> (or <em>windowed</em>) using
        the <PackageLink {...REACT_WINDOW_PACKAGE} /> package. Aside from the
        obvious benefits provided by only rendering a small subset of your
        enumerable data (rather than bloating the DOM with an excessive amount
        of nodes), list virtualization can also assist with:
        <List>
          <Li>
            <strong>Efficient memory allocation</strong>. 'Windowing' naturally
            lends itself to the dynamic generation of attributes/values as each
            object comes into your renderer's scope (as opposed to allocating
            this data upfront for each object in your list). This way you can
            perform this work just when you absolutely need to and then can
            immediately release it for the GC to cleanup. As an example I am
            generating the <code>onClick</code>, <code>id</code>, and{' '}
            <code>className</code> attributes for each <code>menuOption</code>{' '}
            as they get passed to the <code>{'<'}Option /{'>'}</code> renderer
            component.
          </Li>
          <Li>
            <strong>Functional architecture</strong>. The flexibility provided
            through only having to manage subsets of your list allows for a more
            dynamic application. By breaking your code out into smaller, 'pure'
            child components, you can write code that scales well and becomes
            open to performance optimizations - most notably, memoization.
            Simple components that rely on the props passed to it (rather than
            its own managed state) to generate its JSX are likely candidates for
            memoization (testing {'&'} debugging becomes much easier as well).
          </Li>
        </List>
        <em>Note: </em>The only time any noticeable performance degradation will
        be observed is during search input updates when the <code>options</code>{' '}
        count reaches the high tens of thousands. To work around this, the{' '}
        <code>inputDelay</code> (number in milliseconds) can be set to debounce
        the input value. That way, the <code>menuOptions</code> will not be
        recalculated on every keystroke.
      </ListWrapper>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader>
          <Label>Options Count</Label>
          <Buttons>
            {optionCountList.map((count) => (
              <OptionsCountButton
                key={count}
                count={count}
                optionsCount={optionsCount}
                setOptionsCount={setOptionsCount}
              />
            ))}
          </Buttons>
        </CardHeader>
        <CardBody>
          <SelectContainer>
            <Select ref={selectRef} options={options} />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
};

export const Advanced = () => {
  const getOptionValue = useCallback((x: PackageOption): number => x.id, []);
  const getIsOptionDisabled = useCallback((x: PackageOption): boolean => x.name === PACKAGE_OPTIONS[3].name, []);

  const renderOptionLabel = useCallback(
    (option: PackageOption): ReactNode => (
      <OptionContainer>
        <ReactSvg
          {...REACT_SVG_PROPS}
          isDisabled={getIsOptionDisabled(option)}
        >
          <path {...REACT_SVG_PATH_PROPS} />
          <circle {...REACT_SVG_CIRCLE_PROPS} />
        </ReactSvg>
        <OptionName>{option.name}</OptionName>
      </OptionContainer>
    ),
    [getIsOptionDisabled]
  );

  const customCaretIcon = useCallback(
    ({ menuOpen }): ReactNode => (
      <ChevronDownSvg
        menuOpen={menuOpen}
        {...CHEVRON_SVG_PROPS}
      >
        <path {...CHEVRON_DOWN_PATH_PROPS} />
      </ChevronDownSvg>
    ),
    []
  );

  return (
    <Container>
      <Title>Advanced Customization</Title>
      <Hr />
      <ListWrapper>
        Implementation using a couple of the more specialized properties.
        <List>
          <Li>
            <TextHeader>renderOptionLabel(option: any) {'=>'} ReactNode</TextHeader> - Callback
            function with a return type of <code>ReactNode</code>. Use this property in cases
            where the standard <code>getOptionLabel</code> property won't meet your needs (for
            instance, you want to render each option's label using custom JSX). More complex
            option labels will likely equate to longer render durations - this can translate
            into a flash of empty space when a user first starts scrolling. In order to prevent
            this, the <code>menuOverscanCount</code> property can be increased to render additional
            rows outside of the visible area. The default value for this property is 1 and it is
            important to note that increasing this value can negatively impact performance.
          </Li>
          <Li>
            <TextHeader>getIsOptionDisabled(option: any) {'=>'} boolean</TextHeader> - Callback
            function with a return type of <code>Boolean</code>. When it evaluates to a value of
            true, that option iteration will be rendered <em>disabled</em>. As an alternative, you
            can also pass a property of <code>isDisabled</code> with each option. Use of these two
            options - they cannot both be specified.
          </Li>
          <Li>
            <TextHeader>caretIcon: ReactNode | (...args: any[]) {'=>'} ReactNode</TextHeader> - A custom
            node or a function that returns a node can used for the <code>caretIcon</code> property.
            When using a function, an object containing stateful data is forwarded and can be used to style
            your custom node accordingly. The state is <em>{'{ menuOpen, isLoading, isInvalid, isDisabled }'}</em> of
            type <code>Record{'<'}string, boolean{'>'}</code>. The <code>clearIcon</code> property has an identical definition.
          </Li>
        </List>
      </ListWrapper>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader>
          <Label>
            JSX labels, custom caret icon, and disabled option
          </Label>
        </CardHeader>
        <CardBody>
          <SelectContainer>
            <Select
              isSearchable={false}
              options={PACKAGE_OPTIONS}
              themeConfig={THEME_CONFIG}
              caretIcon={customCaretIcon}
              getOptionValue={getOptionValue}
              renderOptionLabel={renderOptionLabel}
              getIsOptionDisabled={getIsOptionDisabled}
            />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
};

export const Portaling = () => {
  const menuPortalElId = 'menu-portal-test';
  const options = useMemo<Option[]>(() => createSelectOptions(3), []);

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPortalTarget, setMenuPortalTarget] = useState<Element | undefined>(undefined);

  const onMenuOpen = useCallback((): void => setMenuOpen(true), []);
  const onMenuClose = useCallback((): void => setMenuOpen(false), []);

  useEffect(() => {
    const portalEl = document.getElementById(menuPortalElId);
    setMenuPortalTarget(portalEl);
  }, [menuPortalElId]);

  return (
    <Container>
      <Title>Portaling</Title>
      <Hr />
      <Paragraph>
        React-Functional-Select exposes a <code>menuPortalTarget</code> prop, that
        allows you to portal the menu component to a dom node of your choosing. Styling
        should be simple enough via normal theme overriding on the menu object and style
        application to the wrapping portal element.
      </Paragraph>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader>
          <Label>
            Menu component portaled to an element below this text.
          </Label>
          <MenuPortalElement
            menuOpen={menuOpen}
            id={menuPortalElId}
          >
            <span>Portal {'<'}div /{'>'}</span>
          </MenuPortalElement>
        </CardHeader>
        <CardBody>
          <SelectContainer>
            <Select
              options={options}
              onMenuOpen={onMenuOpen}
              onMenuClose={onMenuClose}
              scrollMenuIntoView={false}
              menuPortalTarget={menuPortalTarget}
            />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
};

export const Async = () => {
  const delay = 500;
  const selectRef = useRef<SelectRef | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<Option[]>(() => createAsyncOptions(5, 'Initial'));

  const onInputChange = useCallback(() => {
    setIsLoading(true);
  }, []);

  const onSearchChange = useCallback(async (value?: string) => {
    try {
      await mockHttpRequest();

      const count = getRandomInt(1, 5);
      const lblSuffix = `Search text: ${value || 'Initial'}`;
      const nextOptions = createAsyncOptions(count, lblSuffix);

      selectRef.current?.clearValue();
      setOptions(nextOptions);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  }, []);

  return (
    <Container>
      <Title>Async Mode</Title>
      <Hr />
      <ListWrapper>
        Add the <code>async</code> property to enable async mode. There is one key
        difference in core functionality with async mode - changes to search input
        value will not cause the <code>useMenuOptions</code> effect to run. The rest
        of hooking into async mode is achieved using some combination of the properties
        found below. <em>Properties onInputChange and onSearchChange should be memoized.</em>
        <List>
          <Li>
            <TextHeader>onInputChange(value: string) {'=>'} void</TextHeader> -
            callback executed directly following the input control's <code>onChange</code> event.
            This callback is not debounced, so it fires immediately. This is a good
            place to set a stateful loading property in your parent component that is mapped to
            react-functional-select's <code>isLoading</code> property.
          </Li>
          <Li>
            <TextHeader>onSearchChange(value: string) {'=>'} void</TextHeader> -
            callback executed following component state updates for
            the <code>debouncedInputValue</code>. The debounce is set using
            the <code>inputDelay</code> property. This callback is a good place for your
            http fetch request and post-request logic (i.e. setting isLoading false).
          </Li>
          <Li>
            <TextHeader>inputDelay?: number</TextHeader> - As mentioned above, this can be
            set to a positive integer in order to debounce updates to the search input value
            following input change events. This property directly maps to the <code>delay</code> in
            milliconds passed to the <code>setTimeout</code> method.
          </Li>
          <Li>
            <TextHeader>isLoading?: boolean</TextHeader> - When true, a loading animation will
            appear in the far-right of the control and take the place of the clear icon (if shown).
            Additionally, it will hide options in the menu and instead, display a loading message.
            The loading message text defaults to 'Loading...', but can be overriden via
            the <code>loadingMsg</code> property.
          </Li>
        </List>
      </ListWrapper>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader>
          <Label>
            Search debounced 500ms and mock HTTP call resolves after {delay}ms
          </Label>
        </CardHeader>
        <CardBody>
          <SelectContainer>
            <Select
              async
              isClearable
              ref={selectRef}
              options={options}
              inputDelay={delay}
              isLoading={isLoading}
              onInputChange={onInputChange}
              onSearchChange={onSearchChange}
            />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
};