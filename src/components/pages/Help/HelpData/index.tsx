import HelpContact from 'src/components/pages/Help/HelpContact';

const HelpData = () => {
    return (
         <div>
            <div className='about-us-area privacy-policy__content pt-90 pb-100'>
				<div className='custom-container-7'>
						<p>Praesent sed ex vel mauris eleifend mollis. Vestibulum dictum sodales ante, ac pulvinar urna sollicitudin in. Suspendisse sodales dolor nec mattis convallis. Quisque ut nulla viverra, posuere lorem eget, ultrices metus. Nulla facilisi. Duis aliquet, eros in auctor aliquam, tortor justo laoreet nisi, nec pulvinar lectus diam nec libero. Nullam sit amet dia</p>
						<p>Cras porta posuere lectus, vitae consectetur dolor elementum id. Ut interdum, sem eget varius eleifend, ex risus gravida purus, sed finibus tortor nisi maximus orci. Etiam vel sollicitudi</p>
						<div className="pt-50">
							<HelpContact />
						</div>
				</div>
			</div>
        </div>
    );
};

export default HelpData;
